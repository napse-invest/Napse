import {
  DeleteApplicationCommand,
  ElasticBeanstalkClient
} from '@aws-sdk/client-elastic-beanstalk'
import { BrowserWindow } from 'electron'

export default async function Main(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  },
  mainWindow: BrowserWindow,
  ApplicationName: string
) {
  const client = new ElasticBeanstalkClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  const params = {
    ApplicationName: ApplicationName
  }

  try {
    const data = await client.send(new DeleteApplicationCommand(params))
    mainWindow.webContents.send('AWSChannel', {
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      success: false,
      error: err
    })
  }
}
