import { Command, Flags } from '@oclif/core'
import { readFileOrDirectory, writeFile } from '../modules/io'
import { sequence } from '../modules/helpers'
import { markdown, tableOfContents } from '../modules/markdown'
import { wrapper, sanitize, minimize } from '../modules/html'
import { FnTransformer } from '../types'
import { OptionFlag } from '@oclif/core/lib/interfaces'

export default class Parse extends Command {
  static description = 'Parse .md files to html'

  static examples = [
    `$ opdoc parse README.md
     $ opdoc parse ./path/to/folder
    
    `,
  ]

  static args = [
    {
      name: 'source',
      description: 'filename or directory to look for source file',
      default: './README.md',
      required: true,
    },
    {
      name: 'output',
      description: 'output filename',
      default: './index.html',
      required: false,
    },
  ]

  static flags = {
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
      parse: async (input) => {
        const n = parseInt(input)
        if (n <= 0 || n > 6) throw new Error("--tocDepth must have a value between 0 and 6")
        return n
      }
    }) as OptionFlag<1 | 2 | 3 | 4 | 5 | 6>,
  }

  async run(): Promise<void> {
    this.log(`Running ${this.constructor.name}`)
    const { args, flags } = await this.parse(Parse)

    // load source
    this.log(`+ loading ${args.source}`)
    const source = await readFileOrDirectory(args.source)

    // transform markdown
    const html = await sequence(source, [
      !flags.notoc && tableOfContents({ finder: flags.tocString, depth: flags.tocDepth }),
      markdown,
      flags.sanitize && sanitize,
      wrapper({ source }),
      flags.minimize && minimize,
    ].filter(f => f !== false) as FnTransformer[])

    // write
    this.log(`+ writing to ${args.output}`)
    await writeFile(args.output, html)
  }
}
