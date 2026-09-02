import React, { useState } from 'react'
import './Login.css';
import { IonIcon } from '@ionic/react'

import { logoApple, logoFacebook, logoGoogle } from 'ionicons/icons';
import { loginUser } from '../../api/api';
import { useNavigate } from "react-router-dom";
import useDocumentTitle from '../../Hooks/useDocumentTitle';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useDocumentTitle('Login');

    const handleLoginAPI = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await loginUser({ email, password });

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || 'Login failed');
            }

            localStorage.setItem('user', JSON.stringify({
                name: response.data?.userDetails?.name,
                email: response.data?.userDetails?.email,
                token: response.data?.token,
            }));

            navigate('/', { replace: true });
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'No response received from backend';
            setErrorMessage(message);
            console.error(message);
        }
    };

    return (
        <>
            <div className='page-container'>
                <div className='mains-wrapper'>
                    <div className='header-wrapper'>
                        <div className='heading-container'>
                            <h1>Login here</h1>
                        </div>
                        <div className='paragraph-container'>
                            <p>Welcome back you've been missed!</p>
                        </div>
                    </div>
                    <div >
                        <form className='form-container'>
                            <div className='input-container'>
                                <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required />
                                <input type="password" name="password" onChange={(e)=> setPassword(e.target.value)} id="password" placeholder='Password' required />
                            </div>
                            <div className='signin'>
                                <a href="#">Forgot your password?</a>

                                <button type="submit" onClick={handleLoginAPI}>Signin</button>
                            </div>
                            {errorMessage && <p className='error-message'>{errorMessage}</p>}
                        </form>

                        <div className='new-account'>
                            <p>Create new account</p>
                        </div>
                    </div>
                    <div className='other-option'>
                        <div className='paragraph'>
                            <p>Or continue with</p>
                        </div>
                        <div className='icons'>
                            <IonIcon className='icon' icon={logoGoogle} />
                            <IonIcon className='icon' icon={logoFacebook} />
                            <IonIcon className='icon' icon={logoApple} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
