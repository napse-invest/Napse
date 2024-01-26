import {
  CreateApplicationCommand,
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
  ApplicationName: string,
  ApplicationDescription: string
) {
  const client = new ElasticBeanstalkClient({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })

  const params = {
    ApplicationName: ApplicationName,
    Description: ApplicationDescription
  }

  try {
    const data = await client.send(new CreateApplicationCommand(params))
    mainWindow.webContents.send('AWSChannel', {
      from: 'createEBApp',
      message: `Application ${ApplicationName} created`,
      success: true,
      response: data
    })
  } catch (err) {
    mainWindow.webContents.send('AWSChannel', {
      from: 'createEBApp',
      message: `Application ${ApplicationName} failed to create`,
      success: false,
      error: err
    })
  }
}
