# OPDOC

## What's OPDOC?

**One Page Documentation** is a one-stop-shop CLI tool for creating single page static documentation sites from markdown. OPDOC is a bunch of known libraries [glob](https://www.npmjs.com/package/glob), [sanitize-html](https://www.npmjs.com/package/sanitize-html), [html-minifier-terser](https://www.npmjs.com/package/html-minifier-terser), [slugify](https://www.npmjs.com/package/slugify) duct-taped together with [oclif](https://oclif.io/)

---

<!-- toc -->
* [OPDOC](#opdoc)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g opdoc
$ opdoc COMMAND
running command...
$ opdoc (--version)
opdoc/0.1.0 linux-x64 node-v16.14.0
$ opdoc --help [COMMAND]
USAGE
  $ opdoc COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`opdoc compile PATH [OUTPUT]`](#opdoc-compile-path-output)
* [`opdoc help [COMMAND]`](#opdoc-help-command)
* [`opdoc parse SOURCE [OUTPUT]`](#opdoc-parse-source-output)
* [`opdoc serve SOURCE`](#opdoc-serve-source)

## `opdoc compile PATH [OUTPUT]`

Compiles all markdown files in target folder into a single markdown file

```
USAGE
  $ opdoc compile [PATH] [OUTPUT] [-t] [-T <value>] [-d <value>]

ARGUMENTS
  PATH    search this directory for *.md files
  OUTPUT  [default: ./README.md] output filename

TABLE OF CONTENTS FLAGS
  -T, --tocString=<value>  [default: <!-- TOC -->] string to replace with Table of Contents
  -d, --tocDepth=<value>   [default: 6] depth when building Table of Contents.
  -t, --notoc              Skip table of contents generation

DESCRIPTION
  Compiles all markdown files in target folder into a single markdown file

EXAMPLES
  $ opdoc compile ./docs
    Running Compile
    + loading **/*.md files from ./docs
    + writing to ./README.md
```

_See code: [dist/commands/compile.ts](https://github.com/entomb/opdoc/blob/v0.1.0/dist/commands/compile.ts)_

## `opdoc help [COMMAND]`

Display help for opdoc.

```
USAGE
  $ opdoc help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for opdoc.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `opdoc parse SOURCE [OUTPUT]`

Parse .md files to html

```
USAGE
  $ opdoc parse [SOURCE] [OUTPUT] [-x] [-m] [-t] [-T <value>] [-d <value>]

ARGUMENTS
  SOURCE  [default: ./README.md] filename or directory to look for source file
  OUTPUT  [default: ./index.html] output filename

FLAGS
  -m, --minimize  minimize HTML output
  -x, --sanitize  sanitize HTML output

TABLE OF CONTENTS FLAGS
  -T, --tocString=<value>  [default: <!-- TOC -->] string to replace with Table of Contents
  -d, --tocDepth=<value>   [default: 6] depth when building Table of Contents.
  -t, --notoc              Skip table of contents generation

DESCRIPTION
  Parse .md files to html

EXAMPLES
  $ opdoc parse README.md
       $ opdoc parse ./path/to/folder
```

_See code: [dist/commands/parse.ts](https://github.com/entomb/opdoc/blob/v0.1.0/dist/commands/parse.ts)_

## `opdoc serve SOURCE`

create an http server for .md files

```
USAGE
  $ opdoc serve [SOURCE] [-p <value>] [-x] [-m] [-t] [-T <value>] [-d <value>]

ARGUMENTS
  SOURCE  [default: ./README.md] filename or directory to look for source file

FLAGS
  -m, --minimize      minimize HTML output
  -p, --port=<value>  [default: 8181] HTTP server port
  -x, --sanitize      sanitize HTML output

TABLE OF CONTENTS FLAGS
  -T, --tocString=<value>  [default: <!-- TOC -->] string to replace with Table of Contents
  -d, --tocDepth=<value>   [default: 6] depth when building Table of Contents.
  -t, --notoc              Skip table of contents generation

DESCRIPTION
  create an http server for .md files

EXAMPLES
       $ opdoc serve ./path/to/folder --port 8181
       Running Serve
        + serving on http://localhost:8181
```

_See code: [dist/commands/serve.ts](https://github.com/entomb/opdoc/blob/v0.1.0/dist/commands/serve.ts)_
<!-- commandsstop -->
