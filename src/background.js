'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { Window, win } from './native/Window';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerStandardSchemes( [ 'app' ], { secure: true } )

// Quit when all windows are closed.
app.on( 'window-all-closed', () => {
	if( process.platform !== 'darwin' ) {
		app.quit()
	}
} )

app.on( 'activate', () => {
	if( win === null ) {
		Window.create();
	}
} )

app.on( 'ready', async () => {
	if( isDevelopment && !process.env.IS_TEST ) {
		// Install Vue Devtools
		try {
			await installVueDevtools()
		} catch ( e ) {
			console.error( 'Vue Devtools failed to install:', e.toString() )
		}
	}
	Window.create();
} )

// Exit cleanly on request from parent process in development mode.
if( isDevelopment ) {
	if( process.platform === 'win32' ) {
		process.on( 'message', data => {
			if( data === 'graceful-exit' ) {
				app.quit()
			}
		} )
	} else {
		process.on( 'SIGTERM', () => {
			app.quit()
		} )
	}
}
