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
  updateStatus,
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
  updateStatus(mainWindow, 'update', 'START')
  updateStatus(mainWindow, 'update', 'waitForEbEnvToBeReady')
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
    updateStatus(
      mainWindow,
      'update',
      'waitForEbEnvToBeReady',
      'Napse is not deployed. Please deploy Napse first.'
    )
    return
  }
  updateStatus(mainWindow, 'update', 'getNapseVersion')
  const version = await getNapseVersion()
  updateStatus(mainWindow, 'update', 'downloadAWSDeployPackage')
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (!homeDir) throw new Error('No root path found')
  const destDir = path.join(
    homeDir,
    process.env.NODE_ENV === 'production' ? '.napse' : '.napse-dev',
    `deploy-aws-${version}.zip`
  )

  if (fs.existsSync(destDir)) {
    updateStatus(mainWindow, 'update', 'END')
    return
  }

  await downloadAWSDeployPackage(mainWindow, version)
  updateStatus(mainWindow, 'update', 'unzipPackage')
  await unzipPackage(`deploy-aws-${version}.zip`)
  updateStatus(mainWindow, 'update', 'uploadFileToBucket1')
  await uploadFileToBucket(
    secrets,
    mainWindow,
    path.join(`deploy-aws-${version}`, 'config.json'),
    'config.json',
    EB_BUCKET_NAME
  )
  updateStatus(mainWindow, 'update', 'uploadFileToBucket2')
  await uploadFileToBucket(
    secrets,
    mainWindow,
    path.join(`deploy-aws-${version}`, `deploy-${version}.zip`),
    `deploy-${version}.zip`,
    EB_BUCKET_NAME
  )
  updateStatus(mainWindow, 'update', 'createEBAppVersion')
  await createEBAppVersion(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_BUCKET_NAME,
    version
  )
  updateStatus(mainWindow, 'update', 'updateEBEnvironment')
  await updateEBEnvironment(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_ENV_NAME,
    version
  )
  let allDeployedOrTerminated = false

  updateStatus(mainWindow, 'update', 'waitForEbEnvToBeReady2')
  while (!allDeployedOrTerminated) {
    const environments = await getEnvironments(
      secrets,
      mainWindow,
      EB_APP_NAME,
      EB_ENV_NAME,
      'waiting for deployment to get envURL'
    )
    if (environments) {
      for (const env of environments) {
        if (env.Status === 'Ready') {
          allDeployedOrTerminated = true
          if (env.CNAME === undefined) {
            throw new Error('EndpointURL is undefined')
          }
          break
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  updateStatus(mainWindow, 'update', 'END')
}
