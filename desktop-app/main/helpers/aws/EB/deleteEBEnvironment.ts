import {
  ElasticBeanstalkClient,
  TerminateEnvironmentCommand
} from '@aws-sdk/client-elastic-beanstalk'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: Electron.BrowserWindow,
  applicationName: string,
  environmentName: string
) {
  const client = new ElasticBeanstalkClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  const params = {
    ApplicationName: applicationName,
    EnvironmentName: environmentName
  }

  try {
    const data = await client.send(new TerminateEnvironmentCommand(params))
    mainWindow.webContents.send('AWSChannel', {
      from: 'deleteEBEnvironment',
      message: `Environment ${environmentName} deleted`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'deleteEBEnvironment',
      message: `Environment ${environmentName} failed to delete`,
      success: false,
      error: err
    })
  }
}
