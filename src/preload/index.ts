import { contextBridge, ipcRenderer } from 'electron';
import type { Config } from '@infrastructure/config';

contextBridge.exposeInMainWorld('api', {
  checkOllamaStatus: () => ipcRenderer.invoke('ollama:check-status'),
  processText: (text: string, sourceLang: string, targetLang: string) =>
    ipcRenderer.invoke('text:process', { text, sourceLang, targetLang }),
  copyToClipboard: (text: string) => ipcRenderer.invoke('clipboard:copy', text),
  readFromClipboard: () => ipcRenderer.invoke('clipboard:read'),
  getLanguages: () => ipcRenderer.invoke('languages:get'),
  detectLanguage: (text: string) => ipcRenderer.invoke('language:detect', text),
  focusWindow: () => ipcRenderer.invoke('window:focus'),
  onClipboardPaste: (callback: (text: string) => void) => {
    ipcRenderer.on('clipboard:paste-to-input', (_event, text) => callback(text));
  },
  // Config APIs
  getConfig: () => ipcRenderer.invoke('config:get'),
  updateConfig: (config: Partial<Config>) => ipcRenderer.invoke('config:update', config),
  resetConfig: () => ipcRenderer.invoke('config:reset'),
  openSettings: () => ipcRenderer.invoke('settings:open'),
  closeSettings: () => ipcRenderer.invoke('settings:close'),
});
