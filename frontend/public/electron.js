const { app, BrowserWindow } = require('electron')

function createWindow() {
    const startUrl = process.env.DEV 
                   ? 'http://localhost:3000'
                   : url.format({ pathname: path.join(__dirname, '/../build/index.html'),
                   protocol: 'file:',
                   slashes: true,});
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(startUrl);
    process.env.DEV && mainWindow.webContents.openDevTools();
    
    mainWindow.on('closed', function() {
      mainWindow = null;
    });
  }