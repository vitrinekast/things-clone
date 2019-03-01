'use strict'

import { app, protocol, BrowserWindow, Tray, ipcMain, nativeImage, dialog } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'

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
	tray.on( 'right-click', toggleWindow )
	tray.on( 'double-click', toggleWindow )
	tray.on( 'click', function ( event ) {
		toggleWindow();
		win.openDevTools( { mode: 'detach' } )

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
		width: 300,
		height: 450,
		show: false,
		frame: false,
	} )

	if( process.env.WEBPACK_DEV_SERVER_URL ) {

		win.loadURL( process.env.WEBPACK_DEV_SERVER_URL )
		if( !process.env.IS_TEST ) win.webContents.openDevTools({mode: 'detach'})
	} else {
		createProtocol( 'app' )
		win.loadURL( 'app://./index.html' )
	}
}

const base64Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw
7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkZCg87wZW7ewA
AAp1JREFUOMuV1U2IVlUcx/HPnbc0MWwEF40hRWRQmWhEUi4KorlTQ0zQKgqSxKinRYuWrdq0iIp8DAy
CFmYUUVTYY0Qw0SsYVDQRlFlQU4o4VDMUY9NzWtz/45znzo3yv7n/l3O+53fOPS+F/7R9G0l34Vlap/x
PG+gPby76471jpJdxI4p/x5QrakPVZ3yI4lLSLH4LpetIT5N24AWKpZXAW4boXogFnGxQXEzhdQYHl0v
pbtJkBIOkBqXpVhzAWIPi8hocxCyH5qp0e10oHY6BNy3P7szULyc9hzkGTjat8WPRqctkD3QORrJ211J
srPV7CKP4i7S6CXxF+GtY2lG5D5yg+D6bckHaRXs463dV+OtJVzeBj4Q/inuy2uf4NYPvyVR38Vn4GzD
ZAC5ezHbITsqtEU8HvGcjpFblDncpDma16yhvqit+c3mLuQj3Vm7rJ4r3kW+z+6sD80aKQWcivwm318B
pHk9mA11PuSXil/B1thyrSA9HMI8nMtYNlDszcKdbHVcLkduCO0L1VxTv1VTv5plR3lrCuzga+c2YqB2
QNEfqjV7EWl8c8X78kKleTTfWeuA49maDjlNuz8CHFykOYDEabKvg0Jqh+AB/Z4D7qs+h03gbxyK/FVf
WL6FfsC/8tdGoZ0/hRKZ6A+2pUP1jdZecse01cGcBr2YNzqdcG6q/oDgS+7e3XLeF6j/wTvzM6Lfi2nQ
KP8e0P6Ezn9X2488MvLnW75vwP2wCr8J5eD4upsxaHZzOwNNZcU2c3FfwWg1cDuISfIxH6fzedE8G90s
8nuXH8B0eoXNc/6tQjsQfXaQz0/BEXUD3W4oF0hQPflTlJwZIl+FcOp86e2vvoj1Le6I/P974ZA2dBXk
97qQ13Z8+3PS0+AdjKa1R95YOZgAAAABJRU5ErkJggg==`


const toggleWindow = () => {
	if( win.isVisible() ) {
		win.hide()
	} else {
		showWindow()
	}
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

ipcMain.on( 'weather-updated', ( event, weather ) => {
	// Show "feels like" temperature in tray
	tray.setTitle( `${Math.round(weather.currently.apparentTemperature)}°` )

	// Show summary and last refresh time as hover tooltip
	const time = new Date( weather.currently.time ).toLocaleTimeString()
	tray.setToolTip( `${weather.currently.summary} at ${time}` )


} )
