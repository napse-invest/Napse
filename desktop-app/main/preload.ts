import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke: (channel: string, ...args: any[]): Promise<any> =>
    ipcRenderer.invoke(channel, ...args),

  removeAllListeners: (channel: string): Electron.IpcRenderer =>
    ipcRenderer.removeAllListeners(channel)
})
