import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { URL } from './config';
import axios from 'axios';

function LoginPage() {
    const history = useNavigate();
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL}login`, { userid, password });
            const { data } = response;
            if (response.status === 200) {
                if (data.redirectTo === '/vendor') {
                    // Redirect to vendor page
                    history('/vendor', { state: { user: { userid: data.user.userid, phoneno: data.user.phoneno, vc: data.user.vc } } });
                } else {
                    // Redirect to customer page
                    history('/customer', { state: { user: { userid: data.user.userid, phoneno: data.user.phoneno, vc: data.user.vc } } });
                }
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred. Please try again later.');
        }
    };
    function handleSignUp() {
        // Implement your sign-up logic here, such as navigating to the sign-up page
        history('/signup'); // Assuming you have a '/signup' route for sign-up
    }

    return (
        <div className='log'>
            <div className="login-container">
                <h1>LOGIN PAGE</h1>
                <label className='mi'> Username:</label>
                <input className='op' type="text" value={userid} onChange={(e) => setUserid(e.target.value)} />

                <label className='mi'>Password:</label>
                <input className='op' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button onClick={handleSubmit}>Login</button>

                {error && <p className="error-message">{error}</p>}
                <p>Don't have an account? <span onClick={handleSignUp} className="sign-up-link">Sign up</span></p>
            </div>
        </div>
    );
}

export default LoginPage;
