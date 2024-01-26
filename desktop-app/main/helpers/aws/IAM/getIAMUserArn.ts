import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts'
import { BrowserWindow } from 'electron'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow
) {
  const stsClient = new STSClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  const command = new GetCallerIdentityCommand({})

  const stsData = await stsClient.send(command)
  const arn = stsData.Arn
  mainWindow.webContents.send('AWSChannel', {
    from: 'getIAMUserArn',
    message: `User ARN: ${arn}`,
    success: true,
    response: arn
  })
  return arn
}
