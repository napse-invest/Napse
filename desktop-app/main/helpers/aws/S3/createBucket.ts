import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3'
import { BrowserWindow } from 'electron'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow,
  bucketName: string
) {
  const client = new S3Client({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  try {
    const data = await client.send(
      new CreateBucketCommand({
        Bucket: bucketName
      })
    )
    mainWindow.webContents.send('AWSChannel', {
      from: 'createBucket',
      message: `Bucket ${bucketName} created`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'createBucket',
      message: `Bucket ${bucketName} failed to create`,
      success: false,
      error: err
    })
  }
}
