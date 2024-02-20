import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
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
  bucketName: string
): Promise<boolean> {
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

  try {
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName
    })

    const response = await S3client.send(getObjectCommand)

    if (!response.Body) {
      throw new Error('No response body')
    }

    const fullPath = path.join(destDir, fileName)
    const fileStream = fs.createWriteStream(fullPath)

    response.Body.transformToString().then((data) => {
      fileStream.write(data)
      fileStream.close()
    })
    return true
  } catch (error) {
    return false
  }
}
