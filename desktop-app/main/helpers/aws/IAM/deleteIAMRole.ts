import { DeleteRoleCommand, IAMClient } from '@aws-sdk/client-iam'
import { BrowserWindow } from 'electron'
import { detachPoliciesFromRole } from 'main/helpers'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow,
  roleName: string
) {
  const client = new IAMClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })
  await detachPoliciesFromRole(secrets, mainWindow, roleName)
  try {
    await client.send(new DeleteRoleCommand({ RoleName: roleName }))
  } catch (err) {}
}
