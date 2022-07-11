import {Command, Flags} from '@oclif/core'
import {readDirectory, readFile, writeFile} from '../modules/io'
import {sequence} from '../modules/helpers'
import {markdown} from '../modules/markdown'
import {wrapper} from '../modules/wrapper'

export default class Compile extends Command {
  static description = 'Parse .md files to html'

  static examples = [
    `$ opdoc parse README.md
    
    `,
  ]

  static flags = {
    directory: Flags.string({char: 'd', description: 'use a directory as input', required: false}),
  }

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

  async run(): Promise<void> {
    this.log(`Running ${this.constructor.name}`)
    const {args, flags} = await this.parse(Compile)

    // load source
    const source = await (async directory => {
      if (directory) {
        this.log(`+ loading **/*.md files from ${args.source}`)
        return readDirectory(args.source)
      }

      this.log(`+ loading ${args.source}`)
      return readFile(args.source)
    })(flags.directory)

    // transform markdown
    const html: string = await sequence(source, [
      markdown,
      wrapper,
    ])

    // write
    this.log(`+ writing to ${args.output}`)
    await writeFile(args.output, html)
  }
}
