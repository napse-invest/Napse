import { GetRoleCommand, IAMClient } from '@aws-sdk/client-iam'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow,
  role: string
): Promise<string> {
  const iamClient = new IAMClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  let arn = null
  try {
    const data = await iamClient.send(
      new GetRoleCommand({
        RoleName: role
      })
    )
    mainWindow.webContents.send('AWSChannel', {
      from: 'getIAMRoleArn',
      message: `Role ${role} found`,
      success: true,
      response: data
    })
    if (!data.Role) {
      mainWindow.webContents.send('AWSChannel', {
        from: 'getIAMRoleArn',
        message: `Role ${role} not found`,
        success: false,
        error: 'Role not found'
      })
      throw new Error('Role not found')
    }
    arn = data.Role.Arn
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'getIAMRoleArn',
      message: `Role ${role} failed to find`,
      success: false,
      error: err
    })
  }
  if (!arn) {
    throw new Error(
      'Function getIAMRoleArn: arn is null. This should not happen'
    )
  }
  return arn
}
