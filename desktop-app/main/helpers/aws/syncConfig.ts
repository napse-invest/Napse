import { BrowserWindow } from 'electron'
import { EB_BUCKET_NAME, downloadBucket } from 'main/helpers'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow
) {
  await downloadBucket(
    secrets,
    mainWindow,
    'napse-secrets.json',
    EB_BUCKET_NAME
  )
}
