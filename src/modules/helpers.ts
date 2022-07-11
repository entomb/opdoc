import {FnTransformer} from '../types'

export const sequence = async (original: string, fnArr: FnTransformer[]): ReturnType<FnTransformer> => {
  return fnArr.reduce((last, next) => last.then(next), Promise.resolve(original))
}
