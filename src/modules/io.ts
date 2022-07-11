import {
  readFile as fsReadFile,
  writeFile as fsWriteFile,
  copyFile as fsCopyFile,
} from 'node:fs'
import * as glob from 'glob'

export const readFile = (file: string):Promise<string> => {
  return new Promise((resolve, reject) => {
    fsReadFile(file, 'utf8', (err, data) => {
      if (err) return reject(err)
      resolve(data.toString())
    })
  })
}

export const writeFile = (file: string, content:string):Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fsWriteFile(file, content, err => {
      if (err) return reject(err)
      resolve(true)
    })
  })
}

export const copyFile = (src:string, dest:string):Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fsCopyFile(src, dest, err => {
      if (err) return reject(err)
      resolve(true)
    })
  })
}

export const readDirectory = (path:string): Promise<string> => {
  return new Promise((resolve, reject) => {
    glob(path + '/**/*.md', {}, (err, files) => {
      if (err) return reject(err)
      Promise.all(files.map(filename => {
        return readFile(filename)
      })).then(content => {
        resolve(content.map(c => c.toString()).join('\n\n'))
      })
    })
  })
}
