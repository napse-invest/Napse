import { AttachRolePolicyCommand, IAMClient } from '@aws-sdk/client-iam'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow,
  policyArn: string,
  roleName: string
) {
  const iamClient = new IAMClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  const params = {
    PolicyArn: policyArn,
    RoleName: roleName
  }

  try {
    const data = await iamClient.send(new AttachRolePolicyCommand(params))
    mainWindow.webContents.send('AWSChannel', {
      from: 'attachIAMPolicy',
      message: `Policy ${policyArn} attached to role ${roleName}`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'attachIAMPolicy',
      message: `Policy ${policyArn} failed to attach to role ${roleName}`,
      success: false,
      error: err
    })
  }
}
