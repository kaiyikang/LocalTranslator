import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  checkOllamaStatus: () => ipcRenderer.invoke('ollama:check-status'),
  translateText: (text: string, sourceLang: string, targetLang: string) => 
    ipcRenderer.invoke('translate:text', { text, sourceLang, targetLang }),
  copyToClipboard: (text: string) => ipcRenderer.invoke('clipboard:copy', text),
  getLanguages: () => ipcRenderer.invoke('languages:get')
})
