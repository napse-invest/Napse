import {
  CreateSecretCommand,
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
  secretName: string,
  sectretDescription: string,
  secretValue: string
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
      new CreateSecretCommand({
        Name: secretName,
        Description: sectretDescription,
        SecretString: `{\"SECRET\":\"${secretValue}\"}`,
        ForceOverwriteReplicaSecret: true
      })
    )
    mainWindow.webContents.send('AWSChannel', {
      from: 'createSecret',
      message: `Secret ${secretName} created`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'createSecret',
      message: `Secret ${secretName} failed to create`,
      success: false,
      error: err
    })
  }
}
