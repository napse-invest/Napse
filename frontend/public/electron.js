const electron = require('electron');
const path = require('path');
const url = require('url');

const { app } = electron;
const { BrowserWindow } = electron;

let mainWindow;

function createWindow() {
  const startUrl = process.env.DEV
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
      });
  mainWindow = new BrowserWindow();

  mainWindow.loadURL(startUrl);
  process.env.DEV && mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(
    'EVENT_LISTENER_NAME', 
    (event, args) => {
      /* ---- Code to execute as callback ---- */
    }
  );

  ipcRenderer.send(
    'BACKGROUND_PROCESS_START', 
    { 
      "Key1": 123,
      "Key2": 456
    }
  );