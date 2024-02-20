import {
  DescribeEnvironmentsCommand,
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
  environmentName: string,
  info: string = ''
) {
  const client = new ElasticBeanstalkClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  try {
    const data = await client.send(
      new DescribeEnvironmentsCommand({
        ApplicationName: applicationName,
        EnvironmentNames: [environmentName]
      })
    )
    return data.Environments
  } catch (err) {}
}
