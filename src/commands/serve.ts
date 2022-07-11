import { Command, Flags } from '@oclif/core'
import { readFileOrDirectory } from '../modules/io'
import { sequence } from '../modules/helpers'
import { markdown, tableOfContents } from '../modules/markdown'
import { wrapper, sanitize, minimize } from '../modules/html'
import { FnTransformer } from '../types'
import { OptionFlag } from '@oclif/core/lib/interfaces'
import * as http from 'http'

export default class Serve extends Command {
  static description = 'create an http server for .md files'
  static usage = `serve --port 8080`
  static examples = [`
     $ opdoc serve ./path/to/folder --port 8181
     Running Serve
      + serving on http://localhost:8181
    `,
  ]

  static args = [
    {
      name: 'source',
      description: 'filename or directory to look for source file',
      default: './README.md',
      required: true,
    }
  ]

  static flags = {
    port: Flags.integer({
      char: 'p',
      description: 'HTTP server port',
      required: false,
      default: 8181,
    }),
    sanitize: Flags.boolean({
      char: 'x',
      description: 'sanitize HTML output',
      required: false,
      default: false,
    }),
    minimize: Flags.boolean({
      char: 'm',
      description: 'minimize HTML output',
      required: false,
      default: false,
    }),
    notoc: Flags.boolean({
      helpGroup: 'Table of Contents',
      char: 't',
      description: 'Skip table of contents generation',
      required: false,
      default: false,
    }),
    tocString: Flags.string({
      helpGroup: 'Table of Contents',
      char: 'T',
      description: 'string to replace with Table of Contents',
      required: false,
      default: '<!-- TOC -->',
    }),
    tocDepth: Flags.integer({
      helpGroup: 'Table of Contents',
      char: 'd',
      description: 'depth when building Table of Contents.',
      required: false,
      default: 6,
      parse: async (input, context) => {
        const n = parseInt(input)
        if (n <= 0 || n > 6) context.error("--tocDepth must have a value between 0 and 6")
        return n
      }
    }) as OptionFlag<1 | 2 | 3 | 4 | 5 | 6>,
  }


  async run(): Promise<void> {
    this.log(`Running ${this.constructor.name}`)
    const { args, flags } = await this.parse(Serve)

    // create command
    const command = async () => {
      // load source
      this.log(`+ building ${args.source}`)
      const source = await readFileOrDirectory(args.source)

      // transform markdown
      return sequence(source, [
        !flags.notoc && tableOfContents({ finder: flags.tocString, depth: flags.tocDepth }),
        markdown,
        flags.sanitize && sanitize,
        wrapper,
        flags.minimize && minimize,
      ].filter(f => f !== false) as FnTransformer[])
    }

    // transform markdown
    const requestListener: http.RequestListener = async function (req, res) {
      if (req.url !== '/') {
        res.writeHead(404)
        res.end();
        return;
      }

      const html = await command()

      res.writeHead(200);
      res.end(html);
    }


    // write
    this.log(`+ serving on http://localhost:${flags.port}`)
    const server = http.createServer(requestListener);
    server.listen(flags.port);
  }
}
