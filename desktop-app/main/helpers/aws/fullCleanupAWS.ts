import { BrowserWindow } from 'electron'
import {
  EB_APP_NAME,
  EB_BUCKET_NAME,
  EB_ENV_NAME,
  IAM_INSTANCE_PROFILE_NAME,
  IAM_ROLE_NAME_EC2_ROLE,
  IAM_ROLE_NAME_SERVICE_ROLE,
  deleteAllSecrets,
  deleteBucket,
  deleteEBApp,
  deleteEBEnvironment,
  deleteFilesAndDirectories,
  deleteIAMRole,
  deleteInstanceProfile,
  getEnvironments,
  updateStatus
} from 'main/helpers'
import path from 'path'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  deleteData: boolean,
  mainWindow: BrowserWindow
) {
  updateStatus(mainWindow, 'fullReset', 'START')
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (!homeDir) throw new Error('No root path found')
  const destDir = path.join(
    homeDir,
    process.env.NODE_ENV === 'production' ? '.napse' : '.napse-dev'
  )
  updateStatus(mainWindow, 'fullReset', 'deleteFilesAndDirectories1')
  await deleteFilesAndDirectories(destDir, /^deploy-aws/)
  updateStatus(mainWindow, 'fullReset', 'deleteFilesAndDirectories2')
  await deleteFilesAndDirectories(destDir, /^napse-secrets.json/)
  updateStatus(
    mainWindow,
    'fullReset',
    'waitForEnvironmentsToTerminateOrDeploy'
  )
  let someNotReady = true
  while (someNotReady) {
    someNotReady = false
    const environments = await getEnvironments(
      secrets,
      mainWindow,
      EB_APP_NAME,
      EB_ENV_NAME
    )
    if (environments) {
      for (const env of environments) {
        if (
          env.Status !== 'Terminated' &&
          env.Status !== 'Terminating' &&
          env.Status !== 'Ready'
        ) {
          someNotReady = true
          break
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  updateStatus(mainWindow, 'fullReset', 'deleteEBEnvironment')
  await deleteEBEnvironment(secrets, mainWindow, EB_APP_NAME, EB_ENV_NAME)
  updateStatus(mainWindow, 'fullReset', 'waitForEnvironmentsToTerminate')
  let allterminated = false
  let environments = await getEnvironments(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_ENV_NAME
  )
  while (!allterminated && environments) {
    allterminated = true
    for (const env of environments) {
      if (env.Status !== 'Terminated') {
        allterminated = false
        break
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    environments = await getEnvironments(
      secrets,
      mainWindow,
      EB_APP_NAME,
      EB_ENV_NAME
    )
  }
  updateStatus(mainWindow, 'fullReset', 'deleteAllSecrets')
  await deleteAllSecrets(secrets, mainWindow)
  updateStatus(mainWindow, 'fullReset', 'deleteInstanceProfile')
  await deleteInstanceProfile(secrets, mainWindow, IAM_INSTANCE_PROFILE_NAME)
  updateStatus(mainWindow, 'fullReset', 'deleteIAMRole1')
  await deleteIAMRole(secrets, mainWindow, IAM_ROLE_NAME_EC2_ROLE)
  updateStatus(mainWindow, 'fullReset', 'deleteIAMRole2')
  await deleteIAMRole(secrets, mainWindow, IAM_ROLE_NAME_SERVICE_ROLE)
  updateStatus(mainWindow, 'fullReset', 'deleteEBApp')
  await deleteEBApp(secrets, mainWindow, EB_APP_NAME)
  if (deleteData) {
    updateStatus(mainWindow, 'fullReset', 'deleteBucket')
    await deleteBucket(secrets, mainWindow, EB_BUCKET_NAME)
  }
  updateStatus(mainWindow, 'fullReset', 'END')
}
