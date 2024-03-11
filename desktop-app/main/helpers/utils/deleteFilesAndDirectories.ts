import fs from 'fs'
import path from 'path'
import util from 'util'

const unlink = util.promisify(fs.unlink)
const rmdir = util.promisify(fs.rm)

export default async function Main(directoryPath: string, regex: RegExp) {
  const items = fs.readdirSync(directoryPath)
  for (let item of items) {
    const fullPath = path.join(directoryPath, item)
    if (regex.test(item)) {
      if (fs.statSync(fullPath).isDirectory()) {
        await rmdir(fullPath, { recursive: true })
      } else {
        await unlink(fullPath)
      }
    }
  }
}
