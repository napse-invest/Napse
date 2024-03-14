import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import * as fs from 'fs'
import path from 'path'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow,
  fileName: string,
  targetFileName: string,
  bucketName: string
) {
  const S3client = new S3Client({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (!homeDir) throw new Error('No root path found')
  const destDir = path.join(
    homeDir,
    process.env.NODE_ENV === 'production' ? '.napse' : '.napse-dev'
  )

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  const fileContent = fs.readFileSync(path.join(destDir, fileName))
  const params = {
    Bucket: bucketName,
    Key: targetFileName,
    Body: fileContent
  }

  try {
    await S3client.send(new PutObjectCommand(params))
  } catch (err) {}
}
