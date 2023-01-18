import { initializeApp, } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAMvmBnvLQuiWxfD_rypUaYgi6wYEMLVoQ",
    authDomain: "llk-db23.firebaseapp.com",
    projectId: "llk-db23",
    storageBucket: "llk-db23.appspot.com",
    messagingSenderId: "8885616250",
    appId: "1:8885616250:web:271fc3a0ae385bb21605c3",
    measurementId: "G-PDSXBV66RP"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error', error.message);
        }
    }
    //check if user data exists
    //if user data does not exist, create data using snapshot
    //return userdocRef
    return userDocRef;
  }
