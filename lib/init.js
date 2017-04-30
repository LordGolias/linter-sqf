'use babel';

import path from 'path';
import { CompositeDisposable } from 'atom';

const getProjectDir = (filePath) => {
    const atomProject = atom.project.relativizePath(filePath)[0];
    if (atomProject === null) {
        // Default project to file directory if project path cannot be determined
        return path.dirname(filePath);
    }
    return atomProject;
};

const fixPathString = (pathString, fileDir, projectDir) => {
    const string = pathString;
    const fRstring = string.replace(/%f/g, fileDir);
    const pRstring = fRstring.replace(/%p/g, projectDir);
    return pRstring;
};


export default {
    config: {
        executablePath: {
            description: 'Path of the `sqflint` executable',
            type: 'string',
            default: '~/.virtualenvs/sqflint/bin/sqflint',
            //default: path.join(__dirname, '..', 'node_modules', '.bin', 'bootlint'),
        },
        pythonPath: {
            type: 'string',
            default: '.',
        },
        workingDirectory: {
            type: 'string',
            default: '.',
        }
    },

    activate() {
        require('atom-package-deps').install('linter-sqf');

        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(atom.config.observe('linter-sqf.executablePath', (executablePath) => {
            this.executablePath = executablePath;
        }));
        this.subscriptions.add(atom.config.observe('linter-sqf.pythonPath', (value) => {
            this.pythonPath = value;
        }));
        this.subscriptions.add(atom.config.observe('linter-sqf.workingDirectory', (value) => {
            this.workingDirectory = value.replace(path.delimiter, '');
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    provideLinter() {
        const helpers = require('atom-linter');

        return {
            name: 'SQFlint',
            scope: 'file',
            lintsOnChange: false,
            grammarScopes: ['source.sqf'],
            lint: (textEditor) => {
                const filePath = textEditor.getPath();
                const fileDir = path.dirname(filePath);
                const fileText = textEditor.getText();
                const projectDir = getProjectDir(filePath);
                const cwd = fixPathString(this.workingDirectory, fileDir, projectDir);
                const execPath = fixPathString(this.executablePath, '', projectDir);

                const env = Object.create(process.env, {
                    PYTHONPATH: {
                        value: [
                            process.env.PYTHONPATH, fileDir, projectDir,
                            fixPathString(this.pythonPath, fileDir, projectDir),
                        ].filter(x => !!x).join(path.delimiter),
                        enumerable: true,
                    },
                    LANG: { value: 'en_US.UTF-8', enumerable: true },
                });

                if (!fileText) {
                    return Promise.resolve([]);
                }

                const execOpts = {
                    stdin: fileText,
                    cwd: fileDir
                };

                return helpers.exec(this.executablePath,[],execOpts).then((output) => {
                    const messages = [];

                    const lineRegex = /\[(\d+),(\d+)\]:(error|warning|info):(.*)\r?(?:\n|$)/g;
                    let match = lineRegex.exec(output);
                    while (match !== null) {
                        const line = Number.parseInt(match[1], 10) - 1;
                        const column = Number.parseInt(match[2], 10);
                        const position = helpers.generateRange(textEditor, line, column);
                        const severity = match[3];
                        const excerpt = match[4];
                        const message = {
                            severity: severity,
                            excerpt: excerpt,
                            location: { file: filePath, position },
                        };
                        messages.push(message);
                        match = lineRegex.exec(output);
                    };
                    return messages;
                });
            },
        };
    },
};
