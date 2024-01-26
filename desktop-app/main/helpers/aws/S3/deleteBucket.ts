import { DeleteBucketCommand, S3Client } from '@aws-sdk/client-s3'
import { BrowserWindow } from 'electron'
import { emptyBucket } from 'main/helpers'

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
  await emptyBucket(secrets, mainWindow, bucketName)

  try {
    const data = await client.send(
      new DeleteBucketCommand({
        Bucket: bucketName
      })
    )
    mainWindow.webContents.send('AWSChannel', {
      from: 'deleteBucket',
      message: `Bucket ${bucketName} deleted`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'deleteBucket',
      message: `Bucket ${bucketName} failed to delete`,
      success: false,
      error: err
    })
  }
}
