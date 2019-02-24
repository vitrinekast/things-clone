import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import firebase from 'firebase/app';
import { FIREBASE_CONFIG } from "@/common/config";

import 'firebase/firestore'

import './registerServiceWorker'

Vue.config.productionTip = false

firebase.initializeApp( FIREBASE_CONFIG );

export const db = firebase.firestore()

new Vue( {
	router,
	store,
	render: h => h( App )
} ).$mount( '#app' )
