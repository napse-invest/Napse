import { EnvironmentStatus } from '@aws-sdk/client-elastic-beanstalk'
import { BrowserWindow, app, ipcMain } from 'electron'
import serve from 'electron-serve'
import {
  EB_APP_NAME,
  EB_ENV_NAME,
  createWindow,
  deployToAWS,
  fullCleanupAWS,
  getEnvironments,
  getNapseVersion,
  syncConfig,
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
      return await fullCleanupAWS(args.secrets, args.deleteData, mainWindow)
    }
  })
  ipcMain.handle('updateAWS', async (event, args) => {
    if (args.secrets) {
      return await updateAWSApp(args.secrets, mainWindow)
    }
  })

  ipcMain.handle('sync-config', async (event, args) => {
    if (args.secrets) {
      return await syncConfig(args.secrets, mainWindow)
    }
  })

  ipcMain.handle('isDeployedAWS', async (event, args) => {
    if (args.secrets) {
      let allTerminated = true
      const environments = await getEnvironments(
        args.secrets,
        mainWindow,
        EB_APP_NAME,
        EB_ENV_NAME
      )
      if (environments) {
        for (const env of environments) {
          if (env.Status != EnvironmentStatus.Terminated) {
            allTerminated = false
            break
          }
        }
      }
      return !allTerminated
    }
    throw new Error('Not implemented')
  })

  ipcMain.handle('isReadyToUpdateAWS', async (event, args) => {
    if (args.secrets) {
      let allReady = true
      const environments = await getEnvironments(
        args.secrets,
        mainWindow,
        EB_APP_NAME,
        EB_ENV_NAME
      )
      if (environments && environments.length > 0) {
        for (const env of environments) {
          if (
            env.Status != EnvironmentStatus.Terminated &&
            env.Status != EnvironmentStatus.Ready
          ) {
            allReady = false
            break
          }
        }
      } else {
        allReady = false
      }
      return allReady
    }
    throw new Error('Not implemented')
  })

  ipcMain.handle('hasAvailableUpdate', async (event, args) => {
    if (args.secrets) {
      let label = ''
      const environments = await getEnvironments(
        args.secrets,
        mainWindow,
        EB_APP_NAME,
        EB_ENV_NAME
      )
      if (environments) {
        for (const env of environments) {
          if (env.Status === EnvironmentStatus.Ready) {
            if (!env.VersionLabel) {
              throw new Error('No version label found')
            }
            label = env.VersionLabel
            break
          }
        }
      }
      if (!label) {
        return false
      }
      let napseLabel = ''
      try {
        napseLabel = await getNapseVersion()
      } catch (e) {
        return false
      }
      return label !== napseLabel
    }
    throw new Error('Not implemented')
  })

  ipcMain.on('open-new-window', async (event, url) => {
    const newWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
    newWindow.loadURL(url)
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
