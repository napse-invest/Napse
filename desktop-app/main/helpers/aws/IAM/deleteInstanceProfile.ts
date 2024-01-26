import { DeleteInstanceProfileCommand, IAMClient } from '@aws-sdk/client-iam'
import { BrowserWindow } from 'electron'
import { detachRoleFromInstanceProfile } from 'main/helpers'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow,
  instanceProfileName: string
) {
  const client = new IAMClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })
  await detachRoleFromInstanceProfile(secrets, mainWindow, instanceProfileName)
  try {
    const data = await client.send(
      new DeleteInstanceProfileCommand({
        InstanceProfileName: instanceProfileName
      })
    )
    mainWindow.webContents.send('AWSChannel', {
      from: 'deleteInstanceProfile',
      message: `Instance profile ${instanceProfileName} deleted`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'deleteInstanceProfile',
      message: `Instance profile ${instanceProfileName} failed to delete`,
      success: false,
      error: err
    })
  }
}
