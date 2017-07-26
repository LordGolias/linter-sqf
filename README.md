# linter-sqf

This linter plugin for [Atom-Linter](https://atomlinter.github.io/) that
provides an interface to [sqf linter](https://github.com/LordGolias/sqf),
a linter for the SQF language.

See also [language-arma-atom](https://atom.io/packages/language-arma-atom).

## Install

1. Install [Python 3](https://www.python.org/downloads/) (it must be >=3!)
2. run `pip install sqflint` (e.g. in powershell)
3. Copy the full path of the `sqflint` script, e.g.

```
    /Users/lordgolias/.virtualenvs/sqflint/bin/sqflint
    C:\Program Files (x86)\Python36-32\Scripts\sqflint.exe
```

(in powershell, you get this with `get-command sqflint`).

4. Install this package e.g. in the Atom settings. It will ask you to install some dependencies.
5. Go to the settings of this package, and put the path above into the `Executable Path` setting (do not change the others).
6. Create a new file `test.sqf` in atom, fill it with `bla]` (i.e. wrong SQF code) and **save it**. You should see an error message. You are good to go.

## Update

Run `pip install sqflint --upgrade` to upgrade the linter.
