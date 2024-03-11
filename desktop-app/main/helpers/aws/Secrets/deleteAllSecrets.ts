import {
  ListSecretsCommand,
  SecretsManager
} from '@aws-sdk/client-secrets-manager'
import { BrowserWindow } from 'electron'
import { deleteSecret } from 'main/helpers'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow
) {
  const client = new SecretsManager({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  try {
    const data = await client.send(new ListSecretsCommand({}))
    if (!data.SecretList) return
    for (const secret of data.SecretList) {
      if (!secret.Name?.startsWith('napse')) continue
      if (!secret.ARN) throw new Error('No ARN found')
      deleteSecret(secrets, mainWindow, secret.ARN)
    }
  } catch (err) {}
}
