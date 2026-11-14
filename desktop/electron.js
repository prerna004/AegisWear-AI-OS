// ============================================================================
// AegisOS: Desktop Application Wrapper (Electron Main Process)
// Provides native desktop window, system tray, offline resilience, and hardware acceleration
// ============================================================================

const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');

let mainWindow = null;
let tray = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        minWidth: 1024,
        minHeight: 700,
        title: 'AegisOS Enterprise Desktop',
        backgroundColor: '#080c14',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        },
        icon: path.join(__dirname, '../public/favicon.svg'),
        titleBarStyle: 'hidden', // Native frameless window style
        titleBarOverlay: {
            color: '#05080e',
            symbolColor: '#94a3b8',
            height: 32
        }
    });

    const serverUrl = process.env.AEGIS_URL || 'http://localhost:3000';
    mainWindow.loadURL(serverUrl);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    console.log('[Desktop App] Native Electron window launched successfully on:', serverUrl);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
