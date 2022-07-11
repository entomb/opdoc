import {FnTransformer} from '../types'

export const markdown: FnTransformer = async source => {
  return Promise.resolve(source + 'html')
}
