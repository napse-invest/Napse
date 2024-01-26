import {
  DetachRolePolicyCommand,
  IAMClient,
  ListAttachedRolePoliciesCommand
} from '@aws-sdk/client-iam'
import { BrowserWindow } from 'electron'

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

  try {
    const data = await client.send(
      new ListAttachedRolePoliciesCommand({ RoleName: roleName })
    )
    if (!data.AttachedPolicies) return
    for (let policy of data.AttachedPolicies) {
      await client.send(
        new DetachRolePolicyCommand({
          RoleName: roleName,
          PolicyArn: policy.PolicyArn
        })
      )
    }
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'detachPoliciesFromRole',
      message: `Failed to detach policies from role ${roleName}`,
      success: false,
      error: err
    })
  }
}
