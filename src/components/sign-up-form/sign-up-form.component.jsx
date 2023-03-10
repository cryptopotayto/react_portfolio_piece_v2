import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../assets/utils/firebase/firebase.utils';
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    
    const { displayName, email, password, confirmPassword } = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };


    const handleSubmit = async (event) =>{
        event.preventDefault();
        //check if password matches
        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use') {
                alert('Email already exists');
            } else {
            console.log('user creation failed', error);
            }
        }
        //is user authenticated?
        //create user document from return
    };
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default SignUpForm;