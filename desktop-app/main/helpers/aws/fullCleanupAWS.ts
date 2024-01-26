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
  getEnvironments
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
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (!homeDir) throw new Error('No root path found')
  const destDir = path.join(homeDir, '.napse')

  await deleteFilesAndDirectories(destDir, /^deploy-aws/)
  let someNotReady = true
  while (someNotReady) {
    someNotReady = false
    const environments = await getEnvironments(
      secrets,
      mainWindow,
      EB_APP_NAME,
      EB_ENV_NAME,
      'Waiting for environments to terminate / deploy before cleaning up'
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
  await deleteEBEnvironment(secrets, mainWindow, EB_APP_NAME, EB_ENV_NAME)
  let allterminated = false
  let environments = await getEnvironments(
    secrets,
    mainWindow,
    EB_APP_NAME,
    EB_ENV_NAME,
    'Waiting for environments to terminate'
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
      EB_ENV_NAME,
      'Waiting for environments to terminate'
    )
  }
  await deleteAllSecrets(secrets, mainWindow)
  await deleteInstanceProfile(secrets, mainWindow, IAM_INSTANCE_PROFILE_NAME)
  await deleteIAMRole(secrets, mainWindow, IAM_ROLE_NAME_EC2_ROLE)
  await deleteIAMRole(secrets, mainWindow, IAM_ROLE_NAME_SERVICE_ROLE)
  await deleteEBApp(secrets, mainWindow, EB_APP_NAME)
  await deleteBucket(secrets, mainWindow, EB_BUCKET_NAME)
}
