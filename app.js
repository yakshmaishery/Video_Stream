const {app, BrowserWindow, ipcMain, dialog} = require("electron")
const path = require("path")

let root;

const AppWindow = () => {
    root = new BrowserWindow({
        frame:false,
        webPreferences:{
            webSecurity:true,
            nodeIntegration:false,
            preload:path.join(app.getAppPath(),"Renderer.js")
        }
    })
    root.loadFile("Index.html")
}

// Hardware Acceration disable
app.disableHardwareAcceleration()

// Start App
app.on("ready", () => {AppWindow()})

// Close App
ipcMain.on("close_action", () => {app.quit()})

// Minimize App
ipcMain.on("min_action", () => {root.minimize()})

// Maxmize App
ipcMain.on("max_action", (arr,e) => {
    root.isMaximized()?root.unmaximize():root.maximize()
})

// No URL for video stream
ipcMain.on("no_url", () => {
    dialog.showMessageBoxSync(root,{
        // title:"Error",
        message:"Error",
        type:"error",
        detail:"There is no mention of path / url"
    })
})