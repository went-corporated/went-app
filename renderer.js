// const NOTIFICATION_TITLE = 'Bienvenue dans l\'application WentCorp !'
// const NOTIFICATION_BODY = 'Cliquez pour lancer la découverte de l\'application'
// const CLICK_MESSAGE = 'Notification clicked!'

// new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
//   .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE


const ipc = window.require('electron').ipcRenderer;
const { ipcRenderer } = require('electron')
  
// Function that will be called on click 
// event of "Go to settings window" button
function goToSettingsWindow(){
  
    // Make sure to do ipc.send('some String'), 
    // where 'some String' must be same with 
    // the first parameter of ipcMain.on() in app.js 
    ipc.send('openChildWindow');
}

console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg);
})
ipcRenderer.send('asynchronous-message', 'ping');

function closeApp() {
  ipcRenderer.send('asynchronous-message', 'close');
}

function winReduce() {
  ipcRenderer.send('asynchronous-message', 'winReduce');
}

let verifLogin = false;
let verifLoginUsername = false;
let verifLoginAvatar = false;

function submitFromLogin() {
  if (document.getElementById('username').value === '') {
    document.getElementById('error_missingusername').style.display = 'flex';
  } else {
    verifLoginUsername = true;
  }
  if (window.getComputedStyle(document.getElementById('three'), null).getPropertyValue('display') === 'none') {
    document.getElementById('error_missingavatarscreen').style.display = 'flex';
  } else {
    verifLoginAvatar = true;
  }
  if ((verifLoginUsername === true) && (verifLoginAvatar === true)) {
    verifLogin = true;
  }
  if (verifLogin === true) {
    if (localStorage.getItem('rememberChoices') === 'grantied') {
      localStorage.setItem('usernameRemembered', document.getElementById('username').value);
      localStorage.setItem('avatarUrlRemembered', localStorage.getItem('avatarUrl'));
    }
    document.getElementById('one').style.display = 'none';
    document.getElementById('two').style.display = 'none';
    document.getElementById('three').style.display = 'none';
    document.getElementById('avatar').style.display = 'none';
    localStorage.setItem('username', document.getElementById('username').value);
    document.getElementById('username').style.display = 'none';
    document.getElementById('btnSubmit').style.display = 'none';
    document.getElementById('true').style.display = 'flex';
    ipcRenderer.send('asynchronous-message', 'wenClose');
  }
}