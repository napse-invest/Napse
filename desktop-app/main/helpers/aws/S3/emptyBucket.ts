import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client
} from '@aws-sdk/client-s3'
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
    let isTruncated = true
    while (isTruncated) {
      const listObjectsResponse = await client.send(
        new ListObjectsV2Command({ Bucket: bucketName })
      )
      const objectKeys = listObjectsResponse.Contents?.map((object) => ({
        Key: object.Key
      }))
      if (objectKeys && objectKeys.length > 0) {
        await client.send(
          new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: { Objects: objectKeys }
          })
        )
      }
      if (listObjectsResponse.IsTruncated === undefined) {
        throw new Error('IsTruncated is undefined')
      }
      isTruncated = listObjectsResponse.IsTruncated
    }
  } catch (err) {}
}
