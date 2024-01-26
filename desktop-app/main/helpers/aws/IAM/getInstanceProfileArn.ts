import { GetInstanceProfileCommand, IAMClient } from '@aws-sdk/client-iam'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow,
  instanceProfileName: string
) {
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
      new GetInstanceProfileCommand({
        InstanceProfileName: instanceProfileName
      })
    )
    mainWindow.webContents.send('AWSChannel', {
      from: 'getInstanceProfileArn',
      message: `Instance profile ${instanceProfileName} found`,
      success: true,
      response: data
    })
    if (!data.InstanceProfile) {
      mainWindow.webContents.send('AWSChannel', {
        from: 'getInstanceProfileArn',
        message: `Instance profile ${instanceProfileName} not found`,
        success: false,
        error: 'InstanceProfile not found'
      })
      throw new Error('InstanceProfile not found')
    }
    arn = data.InstanceProfile.Arn
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'getInstanceProfileArn',
      message: `Instance profile ${instanceProfileName} failed to find`,
      success: false,
      error: err
    })
  }
  if (!arn) {
    throw new Error(
      'Function getInstanceProfileArn: arn is null. This should not happen'
    )
  }
  return arn
}
