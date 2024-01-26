import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import {
  createWindow,
  deployToAWS,
  fullCleanupAWS,
  updateAWSApp
} from './helpers'

const isProd: boolean = process.env.NODE_ENV === 'production'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600
  })

  ipcMain.handle('deployAWS', async (event, args) => {
    if (args.secrets) {
      return await deployToAWS(args.secrets, mainWindow)
    }
  })
  ipcMain.handle('fullCleanupAWS', async (event, args) => {
    if (args.secrets) {
      return await fullCleanupAWS(args.secrets, mainWindow)
    }
  })
  ipcMain.handle('updateAWS', async (event, args) => {
    if (args.secrets) {
      return await updateAWSApp(args.secrets, mainWindow)
    }
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
