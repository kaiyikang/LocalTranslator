import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  checkOllamaStatus: () => ipcRenderer.invoke('ollama:check-status'),
  processText: (text: string, sourceLang: string, targetLang: string) =>
    ipcRenderer.invoke('text:process', { text, sourceLang, targetLang }),
  copyToClipboard: (text: string) => ipcRenderer.invoke('clipboard:copy', text),
  readFromClipboard: () => ipcRenderer.invoke('clipboard:read'),
  getLanguages: () => ipcRenderer.invoke('languages:get'),
  detectLanguage: (text: string) => ipcRenderer.invoke('language:detect', text),
  onClipboardPaste: (callback: (text: string) => void) => {
    ipcRenderer.on('clipboard:paste-to-input', (_event, text) => callback(text))
  }
})
