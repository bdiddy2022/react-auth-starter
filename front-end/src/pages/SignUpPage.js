import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from 'axios';

export const SignUpPage = () => {
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const history = useHistory();

    const onSignUpClicked = async () => {
        const response = await axios.post('/api/signup', {
            email: emailValue,
            password: passwordValue,
        });
        const { token }  = response.data;
        setToken(token);
        history.push('/');
    }

    return (
        <div className='content-container'>
            <h1>Sign Up</h1>
            {errorMessage && <div className='fail'>{errorMessage}</div>}
            
            <input 
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="email"  />
            <input 
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)} 
                placeholder="password"/>
            <input 
                type="password"
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)} 
                placeholder="confirm password"/>
            <hr/>

            <button 
                disabled={!emailValue || !passwordValue || passwordValue !== confirmPasswordValue}
                onClick={onSignUpClicked}>Sign Up</button>
            <button onClick={() => history.push('/login')}>Already have an account? Log In</button>
        </div>
    );
}