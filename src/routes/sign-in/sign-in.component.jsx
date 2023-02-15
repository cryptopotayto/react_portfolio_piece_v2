import { auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from "../../assets/utils/firebase/firebase.utils";
import { useEffect } from 'react';
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {
    useEffect( () => {
        async function _getRedirectResult() {
            const response = await getRedirectResult(auth);

            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        _getRedirectResult();
    }, []);
    const logGoogleUser = async () =>{
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    return (
        <div>
         <h1>Sign In</h1>
         <button onClick={signInWithGoogleRedirect}>Sign in with Redirect</button>
         <button onClick={logGoogleUser}>Sign in with Google</button>
         <SignUpForm />
        </div>
    );
};

export default SignIn;