const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const path = require("path");
const isDev = require("electron-is-dev");
var kill = require('tree-kill');
var subpy = require('child_process').spawn(path.join(__dirname, "../../scripts/app.exe"), {detached: true})

//var subpy
let mainWindow;

function createWindow() {
    //subpy = require('child_process').spawn(path.join(__dirname, "../../scripts/app.exe"), {detached: true})

    mainWindow = new BrowserWindow({ 
        width: 1200, 
        height: 900,
        icon: "",
        center: true,
        minWidth: 900,
        minHeight: 1200
    });

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );

    mainWindow.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        shell.openExternal(url);
    });

    mainWindow.setMenu(null);
    //mainWindow.on("closed", () => (mainWindow = null));
    mainWindow.on("closed", function () { 
        kill(subpy.pid);
        //process.kill(subpy.pid);
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("before-quit", function () {
    //process.kill(subpy.pid);
    kill(subpy.pid);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        //process.kill(subpy.pid);
        kill(subpy.pid);
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});