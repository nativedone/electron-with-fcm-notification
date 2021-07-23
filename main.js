const electron = require("electron");

const app = electron.app;
const Menu = electron.Menu;
const nativeImage = electron.nativeImage;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow;

let tray = null;
let mainWindow;
let isQuitting;

const { setup: setupPushReceiver } = require("electron-push-receiver");

const path = require("path");
const url = require("url");

const exeName = path.basename(process.execPath);
app.setLoginItemSettings({
  openAtLogin: true,
  path: process.execPath,
  args: ["--processStart", `${exeName}`, "--process-start-args", "--hidden"],
});

app.on("before-quit", function () {
  isQuitting = true;
});

const icon = path.join(__dirname, "/assets/home-smile-fill.png"); // required.
console.log(`path.join(__dirname, "")`, path.join(__dirname, ""));
function createTray() {
  const trayIcon = nativeImage.createFromPath(icon);
  tray = new Tray(trayIcon.resize({ width: 16 }));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Abrir aplicativo`,
      click: () => {
        if (app.dock) {
          app.dock.show();
        }
        if (mainWindow.setSkipTaskbar) {
          mainWindow.setSkipTaskbar(false);
        }
        mainWindow.show();
      },
    },
    {
      label: `View DEV tools`,
      click: () => {
        mainWindow.openDevTools();
      },
    },
    {
      type: "separator",
    },

    {
      label: `Fechar`,
      click: () => {
        isQuitting = true;
        app.quit(); // actually quit the app.
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
}

function createWindow() {
  if (!tray) {
    // if tray hasn't been created already.
    createTray();
  }
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Initialize electron-push-receiver component. Should be called before 'did-finish-load'
  setupPushReceiver(mainWindow.webContents);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // // Emitted when the window is closed.
  // mainWindow.on("closed", function () {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   mainWindow = null;
  // });

  mainWindow.on("close", function (event) {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      if (app.dock) {
        app.dock.hide();
      }
      if (mainWindow.setSkipTaskbar) {
        mainWindow.setSkipTaskbar(true);
      }

      event.returnValue = false;
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
// app.on("window-all-closed", function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
