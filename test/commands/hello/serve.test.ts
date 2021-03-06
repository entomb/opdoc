import { expect, test } from '@oclif/test'
import { closeServer } from '../../../src/modules/http'

describe('serve', () => {
  test
    .stdout()
    .command(['serve', './docs'])
    .it('runs serve cmd', ctx => {
      closeServer(() => {
        expect(ctx.stdout).to.contain('Running Serve')
        expect(ctx.stdout).to.contain('http://localhost:8181')
      })
    })

  test
    .stdout()
    .command(['serve', './docs', '--port=3333'])
    .it('allows --port flag', ctx => {
      closeServer(() => {
        expect(ctx.stdout).to.contain('http://localhost:3333')
      })
    })

})
