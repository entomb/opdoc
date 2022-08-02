# OPDOC

## What's OPDOC?

**One Page Documentation** is a one-stop-shop CLI tool for creating single page static documentation sites from markdown. that.. and also a bunch of known libraries [glob](https://www.npmjs.com/package/glob), [sanitize-html](https://www.npmjs.com/package/sanitize-html), [html-minifier-terser](https://www.npmjs.com/package/html-minifier-terser), [slugify](https://www.npmjs.com/package/slugify) duct-taped together with [oclif](https://oclif.io/)

---

<!-- toc -->
* [OPDOC](#opdoc)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

```sh-session
$ npm install -g opdoc

$ opdoc serve ./docs/
Running Serve
+ serving on http://localhost:8181
...
```

# Commands

<!-- commands -->
* [`opdoc help [COMMAND]`](#opdoc-help-command)

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
<!-- commandsstop -->
