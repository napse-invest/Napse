import { CreateRoleCommand, IAMClient } from '@aws-sdk/client-iam'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow,
  roleName: string,
  policyDict: Object
): Promise<boolean> {
  const iamClient = new IAMClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  try {
    const data = await iamClient.send(
      new CreateRoleCommand({
        AssumeRolePolicyDocument: JSON.stringify(policyDict),
        Path: '/',
        RoleName: roleName
      })
    )
    mainWindow.webContents.send('AWSChannel', {
      from: 'createIAMRole',
      message: `Role ${roleName} created`,
      success: true,
      response: data
    })
    return true
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'createIAMRole',
      message: `Role ${roleName} failed to create`,
      success: false,
      error: err
    })
    return false
  }
}
