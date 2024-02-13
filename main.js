const {Menu,app, BrowserWindow,ipcMain} =require('electron/main');
const path=require('node:path');
const fs = require('fs');  //This is used to read and write files
let win
const createwindow=()=>{
    win=new BrowserWindow({
        width:900,
        height:550,
        // frame:false,
        webPreferences:{
            preload:path.join(__dirname,'preload.js')
        }
    })
    win.loadFile("index.html")
} 


// const menutemp=[
//     {
//         label:'file',
//         submenu:[
//             {
//                 label:'Add Item',
//                 click(){
//                     createAddWindow();
//                 }
//             },
//             {
//                 label:'Clear Item'
//             },
//             {
//                 label:'Quit',
//                 click(){
//                     app.quit();
//                 }
//             }
//         ]
//     }
// ]


app.whenReady().then(()=>{
    createwindow();
    // const menu=Menu.buildFromTemplate(menutemp);
    // Menu.setApplicationMenu(null);

})


app.on('window-all-closed',()=>{
    if(process.platform !=='darwin') app.quit()
})
//handle add window 
function createAddWindow(){

    const win=new BrowserWindow({
        width:300,
        height:200,     
         title:'Add item',
        webPreferences:{
            preload:path.join(__dirname,'preload.js')
        }
    })
    win.loadFile("addWindow.html")
}

ipcMain.on('user-data', (event,userKaData) => {
    const users = getUsersFromFile();
    console.log(userKaData.username); 
    console.log(userKaData.password);
    if (users[userKaData.username]) {
        console.log("nhi hua sex")
     win.webContents.send('signup-response', { success: false, message: 'Username already exists.' });
    } else {
     users[userKaData.username] = { username: userKaData.username, password: userKaData.password };
      saveUsersToFile(users);
      win.webContents.send('signup-response', { success: true, message: 'User created successfully.' });
      console.log("sex ho gya")   
    }
  });
     
  function getUsersFromFile() {
    try {
      const data = fs.readFileSync('users.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }
  
  function saveUsersToFile(users) {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', data, 'utf8');
  }