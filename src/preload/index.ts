import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  checkOllamaStatus: () => ipcRenderer.invoke('ollama:check-status'),
  processText: (text: string, sourceLang: string, targetLang: string) => 
    ipcRenderer.invoke('text:process', { text, sourceLang, targetLang }),
  copyToClipboard: (text: string) => ipcRenderer.invoke('clipboard:copy', text),
  getLanguages: () => ipcRenderer.invoke('languages:get')
})
