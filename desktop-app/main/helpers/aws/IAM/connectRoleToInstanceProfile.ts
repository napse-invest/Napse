import {
  AddRoleToInstanceProfileCommand,
  CreateInstanceProfileCommand,
  IAMClient
} from '@aws-sdk/client-iam'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow,
  instanceProfileName: string,
  roleName: string
) {
  const iamClient = new IAMClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  try {
    const data = await iamClient.send(
      new CreateInstanceProfileCommand({
        InstanceProfileName: instanceProfileName
      })
    )
  } catch (err) {}

  try {
    const data = await iamClient.send(
      new AddRoleToInstanceProfileCommand({
        InstanceProfileName: instanceProfileName,
        RoleName: roleName
      })
    )
  } catch (err) {}
}
