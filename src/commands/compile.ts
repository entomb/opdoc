import {Command} from '@oclif/core'
import {readDirectory, writeFile} from '../modules/io'

export default class Compile extends Command {
  static description = 'Compiles all markdown files in target folder into a single markdown file'

  static examples = [
    `$ opdoc compile ./docs
  Running Compile
  + loading **/*.md files from ./docs
  + writing to ./README.md
    `,
  ]

  static flags = {}

  // static flags = {
  //   directory: Flags.string({char: 'd', description: 'search this directory for *.md files', required: true}),
  // }

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
    const {args} = await this.parse(Compile)

    this.log(`+ loading **/*.md files from ${args.path}`)
    const text = await readDirectory(args.path)

    this.log(`+ writing to ${args.output}`)
    await writeFile(args.output, text)
  }
}
