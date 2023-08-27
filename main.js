const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')
const { spawn } = require('child_process');
const ps = spawn('node', [`${__dirname}/api/ws.js`], {
  stdio: [null, 'pipe', 'inherit'] 
});

ps.stdout.on('data', (data) => {
  console.log(data.toString())
})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 700,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.webContents.openDevTools({
    mode: 'detach'
  })
  win.loadFile('index.html')
}


app.whenReady().then(() => {
  createWindow();
});