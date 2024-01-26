import {
  DeleteSecretCommand,
  SecretsManager
} from '@aws-sdk/client-secrets-manager'
import { BrowserWindow } from 'electron'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow,
  secretARN: string
) {
  const client = new SecretsManager({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  try {
    const data = await client.send(
      new DeleteSecretCommand({
        SecretId: secretARN,
        ForceDeleteWithoutRecovery: true
      })
    )
    mainWindow.webContents.send('AWSChannel', {
      from: 'deleteSecret',
      message: `Secret ${secretARN} deleted`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'deleteSecret',
      message: `Secret ${secretARN} failed to delete`,
      success: false,
      error: err
    })
  }
}
