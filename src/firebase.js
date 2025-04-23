import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


 const firebaseConfig = {
    apiKey: "",
    authDomain: "linkedin-clone-2eb9e.firebaseapp.com",
    projectId: "linkedin-clone-2eb9e",
    storageBucket: "linkedin-clone-2eb9e.firebasestorage.app",
    messagingSenderId: "227652407672",
    appId: "1:227652407672:web:14c01455585b04f7f6788d",
    measurementId: "G-L7F04NHWDE"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {db, auth};
