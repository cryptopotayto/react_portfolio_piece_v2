import { initializeApp, } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    
    if(!userAuth) return; //no arguement, no run the function

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error', error.message);
        }
    }
    //check if user data exists
    //if user data does not exist, create data using snapshot
    //return userdocRef
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password); //create auth user with inputs
  }
