import {
  CreateApplicationVersionCommand,
  ElasticBeanstalkClient
} from '@aws-sdk/client-elastic-beanstalk'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow,
  applicationName: string,
  s3BucketName: string,
  newVersionLabel: string
) {
  const ebClient = new ElasticBeanstalkClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })
  try {
    const data = await ebClient.send(
      new CreateApplicationVersionCommand({
        ApplicationName: applicationName,
        VersionLabel: newVersionLabel,
        SourceBundle: {
          S3Bucket: s3BucketName,
          S3Key: `deploy-${newVersionLabel}.zip`
        }
      })
    )
  } catch (err) {}
}
