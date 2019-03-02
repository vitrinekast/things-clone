import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire'
import store from './store/index'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueFire)

new Vue( {
	router,
	store,
	render: h => h( App )
} ).$mount( '#app' )
