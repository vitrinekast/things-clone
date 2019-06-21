import Vue from 'vue'
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'

Vue.config.productionTip = false
// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBG8yqrduNfYVFfDkvWYuElzN3mWjonpOU",
  authDomain: "vue-todo-4b7a5.firebaseapp.com",
  databaseURL: "https://vue-todo-4b7a5.firebaseio.com",
  projectId: "vue-todo-4b7a5",
  storageBucket: "vue-todo-4b7a5.appspot.com",
  messagingSenderId: "948394401509",
  appId: "1:948394401509:web:955e50feac324d59"
};
firebase.initializeApp( firebaseConfig );


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
