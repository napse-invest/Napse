import { DeleteBucketCommand, S3Client } from '@aws-sdk/client-s3'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd: boolean = process.env.NODE_ENV === 'production'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

async function deployToAWS(
  secrets: {
    AWS__API_TOKEN: string
    AWS__API_SECRET: string
    AWS__REGION: string
  }
  // setDeployData: Dispatch<SetStateAction<{}>>
) {
  const client = new S3Client({
    region: secrets.AWS__REGION,
    credentials: {
      accessKeyId: secrets.AWS__API_TOKEN,
      secretAccessKey: secrets.AWS__API_SECRET
    }
  })
  const params = {
    Bucket: 'napse' // replace BUCKET_NAME with your desired bucket name
  }
  console.log(params)
  try {
    const data = await client.send(new DeleteBucketCommand(params))
    console.log('Success', data)
  } catch (err) {
    console.log('Error', err)
  }
}

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  ipcMain.handle('deployAWS', async (event, args) => {
    if (args.secrets) {
      return await deployToAWS(args.secrets)
    }
  })
  // ipcMain.handle('reload-window', async (_event, _args) => {
  //   mainWindow?.reload()
  // })

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600
    // webPreferences: {
    //   sandbox: false,
    //   contextIsolation: true,
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })

  if (isProd) {
    await mainWindow.loadURL('app://./index.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
    mainWindow.webContents.openDevTools()
  }
})()
  .then()
  .catch(console.error)

app.on('window-all-closed', () => {
  app.quit()
})
