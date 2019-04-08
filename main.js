const path = require('path');
const {app, BrowserWindow} = require('electron');

const debug = /--debug/.test(process.argv[2]);

if (process.mas) {
  app.setName('Creo');
}

let mainWindow = null;

function init() {
  makeSingleInstance();

  function createWindow() {
    const windowOptions = {
      width: 800, height: 600,
      minWidth: 540, minHeight: 500,
      autoHideMenuBar: true, title: app.getName()
    };

    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));

    if (debug) {
      mainWindow.webContents.openDevTools();
      mainWindow.maximize();
    }

    mainWindow.on('closed', () => {
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
    if (window === null) {
      createWindow();
    }
  });


}

function makeSingleInstance() {
  if (process.mas) {
    return;
  }

  app.requestSingleInstanceLock();

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }

      mainWindow.focus();
    }
  });
}

init();
