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
    await client.send(
      new DeleteSecretCommand({
        SecretId: secretARN,
        ForceDeleteWithoutRecovery: true
      })
    )
  } catch (err) {}
}
