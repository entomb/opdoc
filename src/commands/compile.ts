import {Command, Flags} from '@oclif/core'
import {sequence} from '../modules/helpers'
import {tableOfContents} from '../modules/markdown'
import {readDirectory, writeFile} from '../modules/io'
import {FnTransformer} from '../types'
import { OptionFlag } from '@oclif/core/lib/interfaces'

export default class Compile extends Command {
  static description = 'Compiles all markdown files in target folder into a single markdown file'

  static examples = [
    `$ opdoc compile ./docs
  Running Compile
  + loading **/*.md files from ./docs
  + writing to ./README.md
    `,
  ]

  static flags = {
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
        if(n<=0 || n>6) throw new Error("--tocDepth must have a value between 0 and 6")
        return n
      }
    }) as OptionFlag< 1 | 2 | 3 | 4 | 5 | 6>,
  }

  static args = [
    {
      name: 'path',
      description: 'search this directory for *.md files',
      required: true,
    },
    {
      name: 'output',
      description: 'output filename',
      default: './README.md',
      required: false,
    },
  ]

  async run(): Promise<void> {
    this.log(`Running ${this.constructor.name}`)
    const {args, flags} = await this.parse(Compile)

    this.log(`+ loading **/*.md files from ${args.path}`)
    const source = await readDirectory(args.path)

    // transform markdown
    const md = await sequence(source, [
      !flags.notoc && tableOfContents({ finder: flags.tocString, depth: flags.tocDepth }),
    ].filter(f => f !== false) as FnTransformer[])

    this.log(`+ writing to ${args.output}`)
    await writeFile(args.output, md)
  }
}
