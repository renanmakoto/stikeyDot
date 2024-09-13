const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
        backgroundColor: '#333333',
        autoHideMenuBar: true,
        titleBarStyle: 'hidden', // Keep hidden, but we’ll also remove the frame
        frame: false, // Remove the system title bar
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: false,
        }
    })

    mainWindow.loadFile('index.html')
    mainWindow.setMenu(null)

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', () => {
    createWindow()

    // Enable app to start on login
    app.setLoginItemSettings({
        openAtLogin: true,
        path: app.getPath('exe')
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('close-window', () => {
    if (mainWindow) {
        mainWindow.close()
    }
})
