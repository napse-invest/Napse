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
    await client.send(
      new DeleteInstanceProfileCommand({
        InstanceProfileName: instanceProfileName
      })
    )
  } catch (err) {}
}
