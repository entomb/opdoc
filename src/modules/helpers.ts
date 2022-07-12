import { FnTransformer } from '../types'
import slugify from 'slugify'

export const sequence = async (original: string, fnArr: FnTransformer[]): ReturnType<FnTransformer> => {
  return fnArr.reduce((last, next) => last.then(next), Promise.resolve(original))
}

export const slug = (text: string): string => slugify(text, {
  replacement: '-',
  remove: /amp/,
  lower: true,
  strict: true,
  trim: true
})