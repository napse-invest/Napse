import { BrowserWindow } from 'electron'
import * as fs from 'fs'
import {
  EB_APP_NAME,
  EB_BUCKET_NAME,
  EB_ENV_NAME,
  createEBAppVersion,
  downloadAWSDeployPackage,
  getEnvironments,
  getNapseVersion,
  unzipPackage,
  updateEBEnvironment,
  uploadFileToBucket
} from 'main/helpers'
import path from 'path'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow
) {
  const envs = await getEnvironments(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_ENV_NAME
  )
  let napseIsDeployed = false
  if (envs) {
    for (const env of envs) {
      if (env.Status === 'Ready') {
        napseIsDeployed = true
        break
      }
    }
  }
  if (!napseIsDeployed) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'updateAWSApp',
      message: 'Napse is not deployed',
      success: false
    })
    return
  }
  const version = await getNapseVersion()
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (!homeDir) throw new Error('No root path found')
  const destDir = path.join(homeDir, '.napse', `deploy-aws-${version}.zip`)

  if (fs.existsSync(destDir)) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'updateAWSApp',
      message: `deploy-aws-${version}.zip already downloaded`,
      success: true
    })
    return
  }

  await downloadAWSDeployPackage(mainWindow, version)
  await unzipPackage(`deploy-aws-${version}.zip`)
  await uploadFileToBucket(
    secrets,
    mainWindow,
    path.join(`deploy-aws-${version}`, 'config.json'),
    'config.json',
    EB_BUCKET_NAME
  )
  await uploadFileToBucket(
    secrets,
    mainWindow,
    path.join(`deploy-aws-${version}`, `deploy-${version}.zip`),
    `deploy-${version}.zip`,
    EB_BUCKET_NAME
  )
  await createEBAppVersion(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_BUCKET_NAME,
    version
  )
  await updateEBEnvironment(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_ENV_NAME,
    version
  )
}
