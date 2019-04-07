const {app, BrowserWindow} = require('electron');

function createWindow() {

  let window = new BrowserWindow({width: 800, height: 600});

  window.loadFile('index.html');

  window.webContents.openDevTools();

  window.on('closed', () => {
    window = null;
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
