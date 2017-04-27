# linter-sqf

This linter plugin for [Atom-Linter](https://atomlinter.github.io/) that
provides an interface to [sqf linter](https://github.com/LordGolias/sqf),
a linter for the SQF language.

See also [language-arma-atom](https://atom.io/packages/language-arma-atom).

## Installation

1. Install [Python 3](https://www.python.org/downloads/) (it must be >=3!)
1. Download or clone the [sqf linter](https://github.com/LordGolias/sqf).
2. Install it in a virtualenv or other location (`pip install .`) and copy the full path of the `sqflint` script, e.g.

    /Users/lordgolias/.virtualenvs/sqflint/bin/sqflint

3. Install this package.
4. Go to the settings of this package, and put the path above into the `Executable Path` setting.
5. create a new file `test.sqf` in atom, and fill it with `bla]` (i.e. wrong SQF code). You should see an error message.
