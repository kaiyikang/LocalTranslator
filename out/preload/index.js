"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  checkOllamaStatus: () => electron.ipcRenderer.invoke("ollama:check-status")
});
