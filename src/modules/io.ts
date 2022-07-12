import {
  readFile as fsReadFile,
  writeFile as fsWriteFile,
  copyFile as fsCopyFile,
  lstatSync as fsDataSync,
} from 'node:fs'
import * as glob from 'glob'
import globby = require('globby')

export const readFile = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fsReadFile(file, 'utf-8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

export const writeFile = (file: string, content: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fsWriteFile(file, content, err => {
      if (err) return reject(err)
      resolve(true)
    })
  })
}

export const copyFile = (src: string, dest: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fsCopyFile(src, dest, err => {
      if (err) return reject(err)
      resolve(true)
    })
  })
}

export const readDirectory = async (path: string): Promise<string> => {
  const files = await globby(path + '/**/*.md')
  const content = await Promise.all(files.map(filename => readFile(filename)))

  return content.map(c => c.toString()).join('\n\n')
}

export const readFileOrDirectory = (path: string): Promise<string> => {
  if (fsDataSync(path).isDirectory()) {
    return readDirectory(path)
  }

  if (fsDataSync(path).isFile()) {
    return readFile(path)
  }

  throw new Error(`path ${path} is not a file or directory`)
}
