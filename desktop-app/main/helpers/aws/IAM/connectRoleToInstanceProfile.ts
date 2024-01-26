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
    mainWindow.webContents.send('AWSChannel', {
      from: 'createInstanceProfile',
      message: `Instance profile ${instanceProfileName} created`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      success: false,
      error: err
    })
  }

  try {
    const data = await iamClient.send(
      new AddRoleToInstanceProfileCommand({
        InstanceProfileName: instanceProfileName,
        RoleName: roleName
      })
    )
    mainWindow.webContents.send('AWSChannel', {
      from: 'addRoleToInstanceProfile',
      message: `Role ${roleName} added to instance profile ${instanceProfileName}`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'addRoleToInstanceProfile',
      message: `Role ${roleName} failed to add to instance profile ${instanceProfileName}`,
      success: false,
      error: err
    })
  }
}
