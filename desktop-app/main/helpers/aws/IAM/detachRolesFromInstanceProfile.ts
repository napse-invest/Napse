import {
  GetInstanceProfileCommand,
  IAMClient,
  RemoveRoleFromInstanceProfileCommand
} from '@aws-sdk/client-iam'
import { BrowserWindow } from 'electron'

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

  try {
    const instanceProfile = await client.send(
      new GetInstanceProfileCommand({
        InstanceProfileName: instanceProfileName
      })
    )
    if (!instanceProfile.InstanceProfile?.Roles) return
    for (let role of instanceProfile.InstanceProfile.Roles) {
      await client.send(
        new RemoveRoleFromInstanceProfileCommand({
          InstanceProfileName: instanceProfileName,
          RoleName: role.RoleName
        })
      )
    }
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'detachRoleFromInstanceProfile',
      message: `Failed to detach role from instance profile ${instanceProfileName}`,
      success: false,
      error: err
    })
  }
}
