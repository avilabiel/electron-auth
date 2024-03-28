// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const AuthMicrosoftProvider = require("./authMicrosoftProvider");
const authProvider = new AuthMicrosoftProvider();
const { shell } = require("electron");

const config = require("dotenv");
config.config();

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "logo.png"),
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Event handlers
ipcMain.on("LOGIN", async () => {
  const account = await authProvider.login();

  await mainWindow.loadFile(path.join(__dirname, "./index.html"));

  mainWindow.webContents.send("SHOW_WELCOME_MESSAGE", account);
});

ipcMain.on("LOGOUT", async () => {
  await authProvider.logout();

  await mainWindow.loadFile(path.join(__dirname, "./index.html"));
});

ipcMain.on("GET_PROFILE", async () => {
  const tokenRequest = {
    scopes: protectedResources.graphMe.scopes,
  };

  const tokenResponse = await authProvider.getToken(tokenRequest);
  const account = authProvider.account;

  await mainWindow.loadFile(path.join(__dirname, "./index.html"));

  const graphResponse = await getGraphClient(tokenResponse.accessToken)
    .api(protectedResources.graphMe.endpoint)
    .get();

  mainWindow.webContents.send("SHOW_WELCOME_MESSAGE", account);
  mainWindow.webContents.send("SET_PROFILE", graphResponse);
});

ipcMain.on("OPEN_SIMPLE_AUTH0_URL", async () => {
  const url = `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&client_id=${process.env.AUTH0_CLIENT_ID}&redirect_uri=${process.env.AUTH0_CALLBACK_URL}`;

  shell.openExternal(url);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
try {
  require("electron-reloader")(module);
} catch (_) {}
