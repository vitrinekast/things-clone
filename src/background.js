'use strict'
const path = require('path');

import { app, protocol, BrowserWindow, Tray, ipcMain, nativeImage, dialog } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
const resolve = file => path.resolve(__dirname, file);

const rootPath = resolve('..');


const isDevelopment = process.env.NODE_ENV !== 'production'

let tray = undefined;
let win = undefined;

protocol.registerStandardSchemes( [ 'app' ], { secure: true } )


app.on('ready', () => {
  createTray()
  createWindow()
})

app.on( 'window-all-closed', () => {
	app.quit();
} )


const createTray = () => {
	let icon = nativeImage.createFromDataURL( base64Icon )
	tray = new Tray( icon )
	tray.on( 'right-click', toggleTrayWindow )
	tray.on( 'double-click', toggleTrayWindow )
	tray.on( 'click', function ( event ) {
		toggleTrayWindow();
	} )
}

const getWindowPosition = () => {
	const windowBounds = win.getBounds()
	const trayBounds = tray.getBounds()

	// Center window horizontally below the tray icon
	const x = Math.round( trayBounds.x + ( trayBounds.width / 2 ) - ( windowBounds.width / 2 ) )

	// Position window 4 pixels vertically below the tray icon
	const y = Math.round( trayBounds.y + trayBounds.height + 4 )

	return { x: x, y: y }
}


const createWindow = () => {
	win = new BrowserWindow( {
		width: 800,
		height: 600,
		show: true,
		frame: false
	} )


	if( process.env.WEBPACK_DEV_SERVER_URL ) {

		win.loadURL( process.env.WEBPACK_DEV_SERVER_URL )
		if( !process.env.IS_TEST ) win.webContents.openDevTools({mode: 'detach'})
	} else {
		createProtocol( 'app' )
		win.loadURL( 'app://./index.html' )
	}
}

const base64Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAADNklEQVQ4EXWTS2wbVRSGv5mxPY4fE8eOkzhpEluGlC5aSNQUVY3UBEShsEONQAiBWFGWrKhAIKQKIcQGdVWxAdRKkaALEGITFlVCUEjaqrQh7iOlOA8npo5f8SP2jO3LjA0RVOIsrq7OOf9/zv3vORL/Z+OiExtBhC6hO1L8JKUeThWgSg87eUMfOdSuvHWkX56I9tKpyBBPicy1VWlmIbl7nguuhX9j/kPQ9Xbh9FiP++NXRiXfY/3gcbVSyxX4IwmXroni9Hrlg8SnbZ+BZDZgnv+wRd5Zf3W4y/fliwecilOpYbMJ7LZW1KiDYUjUhMJ0vCYWE5nTy2f3fb5HMPbhjwM+tXvuWNjf38hvIRk7eLQgHo/WrFHYyVAqZsDuQw10s7CRe5Asbo7Nvn9ipVnjoHPlVKir0i/v3GZ0fw/RcJj5q0uUKjKiIejzKRyeOMDynTjL8d8Z7vR2bTU2Xp6Fs4rVxutPD5zp9WT3D4RCPHviOXy+DuyygV78AY9jk+EnnmEwHCUaGSS1fh1v9TfchXjjyLHnL9omJyeVR+o3Ov2KF1fouMVHUx3jLqORqzSETKk6YXqjyLJMpMcDlV9I1gv++oJmV2KxmDhzvPzUUE/6UFVxsOscYnvrCmr6HCuX75BbS+P3r5Kt7jOfZGBPXiBSn0fObM6/cH5pqqVzNjcVm1Um6+oXjt78FUKDcHNxjeXvkwjznzpcdiKH3yN7C9Jzy6TKpbrHK6asZs0xgYtf1edwG/FgKEdq/gZqQTffD5pfQuswB7Ek4drVefDzEr5ABptXX//uG33GwjYJPsmS17rF4uCTEk5/kT9j6yhKhUYbNJygiArbtxLYvXnCRyU83eLXd++xvUdgXTQ/GzavIDgEmWSOvkADtd2OK+Cgx6eTTmQJPgo2TaC1s2lCmlr/PWvgdNCHA7wBQXxXT2slyT3+uN0pmxoYubJeKFV3+oN0WjmqSq9V1LI9grXbrOoNirUaqmGIc1v39ctujZeEqVM5b1wyHI2RbFx8VEhQS93jfgve2ghrJavjJtmbJzkonLhrJa6/Nk3J7NIMWSaJr4/SJoKM1GQqM99y01wEw4r8BWmYRwV29lBWAAAAAElFTkSuQmCC`


const toggleTrayWindow = () => {
	if( win.isVisible() ) {
		win.hide()
	} else {
		showTrayWindow()
	}
}

const showTrayWindow = () => {
	const position = getWindowPosition()
	win.setPosition( position.x, position.y, false )
	win.setSize(350, 550)
	win.show()
	win.focus()
}

const showWindow = () => {
	const position = getWindowPosition()
	win.setPosition( position.x, position.y, false )
	win.show()
	win.focus()
}

ipcMain.on( 'show-window', () => {
	showWindow()
} )
