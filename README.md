# linter-sqf

This linter plugin for [Atom-Linter](https://atomlinter.github.io/) that
provides an interface to [sqf linter](https://github.com/LordGolias/sqf),
a linter for the SQF language.

See also [language-arma-atom](https://atom.io/packages/language-arma-atom).

## Installation

1. Install [Python 3](https://www.python.org/downloads/) (it must be >=3!)
2. Download or clone the [sqf linter](https://github.com/LordGolias/sqf).
3. Install it in a virtualenv or other in the system (`pip install -e .` in powershell).
4. Copy the full path of the `sqflint` script, e.g.

```
    /Users/lordgolias/.virtualenvs/sqflint/bin/sqflint
    C:\Program Files (x86)\Python36-32\Scripts\sqflint.exe
```

(in powershell, you get this with `get-command sqflint`).

5. Install this package e.g. in the Atom settings. It will ask you to install some dependencies.
6. Go to the settings of this package, and put the path above into the `Executable Path` setting.
7. Create a new file `test.sqf` in atom, and fill it with `bla]` (i.e. wrong SQF code). You should see an error message.

## Update

The sqflint is often updated in github. When you install it with `pip install -e .`,
you can update the directory you installed it from (e.g. `git fetch origin; git reset --hard origin/master`).
Otherwise, you can just uninstall it (`pip uninstall sqflint`) and install the new version.
