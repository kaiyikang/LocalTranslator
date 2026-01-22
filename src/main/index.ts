import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { getOllamaStatus } from '@usecase/checkStatus'
import { processText } from '@usecase/processText'
import { getSupportedLanguages, detectLanguageFromText } from '@usecase/getSupportedLanguages'
import { copyToClipboard } from '@usecase/copyToClipboard'
import { readFromClipboard } from '@usecase/readFromClipboard'
import { join } from 'path'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    backgroundColor: '#121212',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']!)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  ipcMain.handle('ollama:check-status', async () => getOllamaStatus())
  ipcMain.handle('text:process', async (_event, input) => processText(input))
  ipcMain.handle('clipboard:copy', (_event, text: string) => copyToClipboard(text))
  ipcMain.handle('clipboard:read', () => readFromClipboard())
  ipcMain.handle('languages:get', () => getSupportedLanguages())
  ipcMain.handle('language:detect', (_event, text: string) => detectLanguageFromText(text))

  createWindow()

  // Global shortcut: Ctrl+Shift+C to paste clipboard to input
  globalShortcut.register('CommandOrControl+D', () => {
    const text = readFromClipboard()
    if (mainWindow && text) {
      mainWindow.webContents.send('clipboard:paste-to-input', text)
    }
  })
})

app.on('will-quit', () => globalShortcut.unregisterAll())

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
