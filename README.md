# OPDOC

## What's OPDOC?

**One Page Documentation** is a one-stop-shop CLI tool for creating single page static documentation sites from markdown

___

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
opdoc/0.0.0 linux-x64 node-v16.14.0
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
* [`opdoc plugins`](#opdoc-plugins)
* [`opdoc plugins:install PLUGIN...`](#opdoc-pluginsinstall-plugin)
* [`opdoc plugins:inspect PLUGIN...`](#opdoc-pluginsinspect-plugin)
* [`opdoc plugins:install PLUGIN...`](#opdoc-pluginsinstall-plugin-1)
* [`opdoc plugins:link PLUGIN`](#opdoc-pluginslink-plugin)
* [`opdoc plugins:uninstall PLUGIN...`](#opdoc-pluginsuninstall-plugin)
* [`opdoc plugins:uninstall PLUGIN...`](#opdoc-pluginsuninstall-plugin-1)
* [`opdoc plugins:uninstall PLUGIN...`](#opdoc-pluginsuninstall-plugin-2)
* [`opdoc plugins update`](#opdoc-plugins-update)
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

_See code: [dist/commands/compile.ts](https://github.com/entomb/opdoc/blob/v0.0.0/dist/commands/compile.ts)_

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

_See code: [dist/commands/parse.ts](https://github.com/entomb/opdoc/blob/v0.0.0/dist/commands/parse.ts)_

## `opdoc plugins`

List installed plugins.

```
USAGE
  $ opdoc plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ opdoc plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `opdoc plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ opdoc plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ opdoc plugins add

EXAMPLES
  $ opdoc plugins:install myplugin 

  $ opdoc plugins:install https://github.com/someuser/someplugin

  $ opdoc plugins:install someuser/someplugin
```

## `opdoc plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ opdoc plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ opdoc plugins:inspect myplugin
```

## `opdoc plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ opdoc plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ opdoc plugins add

EXAMPLES
  $ opdoc plugins:install myplugin 

  $ opdoc plugins:install https://github.com/someuser/someplugin

  $ opdoc plugins:install someuser/someplugin
```

## `opdoc plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ opdoc plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ opdoc plugins:link myplugin
```

## `opdoc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ opdoc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ opdoc plugins unlink
  $ opdoc plugins remove
```

## `opdoc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ opdoc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ opdoc plugins unlink
  $ opdoc plugins remove
```

## `opdoc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ opdoc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ opdoc plugins unlink
  $ opdoc plugins remove
```

## `opdoc plugins update`

Update installed plugins.

```
USAGE
  $ opdoc plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

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

_See code: [dist/commands/serve.ts](https://github.com/entomb/opdoc/blob/v0.0.0/dist/commands/serve.ts)_
<!-- commandsstop -->
