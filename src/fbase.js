import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage"

const firebaseConfig = {

    apiKey: process.env.REACT_APP_API_KEY,

    authDomain: process.env.REACT_APP_AUTH_DOMAIN,

    projectId: process.env.REACT_APP_PROJECT_ID,

    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,

    appId: process.env.REACT_APP_APP_ID,

    measurementId: process.env.REACT_APP_MEASUREMENT_ID

};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage(firebaseApp);