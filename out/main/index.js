"use strict";
const electron = require("electron");
const path = require("path");
let config = {
  ollama: {
    baseUrl: "http://localhost:11434",
    model: "translategemma",
    timeout: 3e4
  },
  defaultTargetLang: "Chinese"
};
function getConfig() {
  return config;
}
const OLLAMA_BASE_URL = "http://127.0.0.1:11434";
async function checkConnection() {
  try {
    const { ollama } = getConfig();
    const baseUrl = ollama?.baseUrl || OLLAMA_BASE_URL;
    const res = await fetch(`${baseUrl}/api/tags`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}
async function getOllamaStatus() {
  return await checkConnection();
}
let mainWindow = null;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 400,
    height: 600,
    backgroundColor: "#121212",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  electron.ipcMain.handle("ollama:check-status", async () => {
    return await getOllamaStatus();
  });
  createWindow();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
