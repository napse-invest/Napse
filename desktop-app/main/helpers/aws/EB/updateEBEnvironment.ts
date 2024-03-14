import {
  ConfigurationOptionSetting,
  ElasticBeanstalkClient,
  UpdateEnvironmentCommand
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
  newVersionLabel: string,
  OptionSettings?: ConfigurationOptionSetting[]
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
      new UpdateEnvironmentCommand({
        ApplicationName: applicationName,
        EnvironmentName: environmentName,
        VersionLabel: newVersionLabel,
        OptionSettings: OptionSettings
      })
    )
  } catch (err) {}
}
