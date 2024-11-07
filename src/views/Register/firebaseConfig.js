import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMn_ZeYxnIvNZI0jsQeBBo9wbxirrAzSQ",
    authDomain: "warm-drive-399810.firebaseapp.com",
    projectId: "warm-drive-399810",
    storageBucket: "warm-drive-399810.appspot.com",
    messagingSenderId: "782497044092",
    appId: "1:782497044092:web:6750fffc005f46ddfe5bf9",
    measurementId: "G-81LQ42KZLH"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };