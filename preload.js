// preload.js

const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
//   send:(channel,data)=>ipcRenderer.send(channel,data),
   userData:(userKaData)=>ipcRenderer.send('user-data',(userKaData)),
   message:(callback)=>ipcRenderer.on('signup-response',(value)=>
  
   callback(value))                                                   
});
