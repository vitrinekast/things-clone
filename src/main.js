import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import firebase from 'firebase'
import 'firebase/firestore'

import './registerServiceWorker'

Vue.config.productionTip = false

var config = {
    apiKey: "AIzaSyBG8yqrduNfYVFfDkvWYuElzN3mWjonpOU",
    authDomain: "vue-todo-4b7a5.firebaseapp.com",
    databaseURL: "https://vue-todo-4b7a5.firebaseio.com",
    projectId: "vue-todo-4b7a5",
    storageBucket: "vue-todo-4b7a5.appspot.com",
    messagingSenderId: "948394401509"
  };
firebase.initializeApp(config);

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
