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
  const destDir = path.join(homeDir, '.napse')

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  if (fs.existsSync(path.join(destDir, `deploy-aws-${version}.zip`))) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'downloadAWSDeployPackage',
      message: `deploy-aws-${version}.zip already downloaded`,
      success: true
    })
    return
  }
  await download(mainWindow, url, { directory: destDir })
  // Unzip
}
