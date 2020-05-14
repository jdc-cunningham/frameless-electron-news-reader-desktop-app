// this is based on a crash course I followed
// https://github.com/jdc-cunningham/cross-platform-app/blob/crash-courses/desktop/main.js
const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;
const macPlatform = process.platform == 'darwin';

let mainWindow;

// listen for app to be ready
app.on('ready', () => {
    // create new window
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        frame: false,
        transparent: true
    });

    // load html file into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './reactjs/frameless-news-reader/build/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // quit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    });

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // insert menu
    Menu.setApplicationMenu(mainMenu);
});

// create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: macPlatform ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// if Mac add empty object to menu
if (macPlatform) {
    mainMenuTemplate.unshift({});
}

// add dev tools menu itme if not in prod
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label:'Dev tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: macPlatform ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) { // want devtools to show up on active window
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}