import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import { FIREBASE_CONFIG } from "@/common/config";

firebase.initializeApp( FIREBASE_CONFIG );

export const db = firebase.firestore()

export default firebase;
