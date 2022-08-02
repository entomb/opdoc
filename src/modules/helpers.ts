import { FnTransformer } from '../types'
import * as sanitizeHtml from 'sanitize-html'
import slugify from 'slugify'

export const sequence = async (original: string, fnArr: FnTransformer[]): ReturnType<FnTransformer> => {
  return fnArr.reduce((last, next) => last.then(next), Promise.resolve(original))
}

export const slug = (text: string): string => slugify(sanitizeHtml(text, { allowedTags: [] }), {
  replacement: '-',
  remove: /amp/,
  lower: true,
  strict: true,
  trim: true
}).replace("amp", "")