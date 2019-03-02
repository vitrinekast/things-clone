import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import { FIREBASE_CONFIG } from "@/common/config";

firebase.initializeApp({
  apiKey: "paste your own",
  authDomain: "paste your own",
  databaseURL: "paste your own",
  projectId: "paste your own",
  storageBucket: "paste your own",
  messagingSenderId: "paste your own"
});

firebase.initializeApp( FIREBASE_CONFIG );

export const db = firebase.firestore()

export default firebase;
