import { download } from 'electron-dl'
import * as fs from 'fs'
import path from 'path'

export default async function Main(
  mainWindow: Electron.BrowserWindow,
  version: string
) {
  const url = `https://github.com/napse-invest/napse-developer-toolkit/releases/download/${version}/deploy-aws-${version}.zip`
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (!homeDir) throw new Error('No root path found')
  const destDir = path.join(
    homeDir,
    process.env.NODE_ENV === 'production' ? '.napse' : '.napse-dev'
  )

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  if (fs.existsSync(path.join(destDir, `deploy-aws-${version}.zip`))) {
    return
  }
  let downloaded = false
  while (!downloaded) {
    try {
      await download(mainWindow, url, { directory: destDir })
      downloaded = true
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
}
