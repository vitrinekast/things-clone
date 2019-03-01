import { BrowserWindow } from 'electron'

const defaultProps = {
	width: 500,
	height: 800,
    titleBarStyle: 'hidden',
	show: false
}

let win;

const Window = {

	create() {
		win = new BrowserWindow( defaultProps )

		if( process.env.WEBPACK_DEV_SERVER_URL ) {

			win.loadURL( process.env.WEBPACK_DEV_SERVER_URL )
			if( !process.env.IS_TEST ) win.webContents.openDevTools()
		} else {
			createProtocol( 'app' )
			win.loadURL( 'app://./index.html' )
		}

		win.on( 'closed', () => {
			win = null
		} )
		win.on( 'ready-to-show', () => {
			win.show()
		} )
	}

}

export { win, Window }
