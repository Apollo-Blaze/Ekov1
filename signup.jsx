import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css'
import './config.js'

function SignUp() {
    const history = useNavigate();
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [vc, setVc] = useState('');
    const [error, setError] = useState('');

    
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/signup`, { userid, password, phoneno, vc });
            if (response.status === 200) {
                // Redirect to login page or any other page
                history('/login');
            }
        } catch (error) {
            setError(error.response.data.error);
        }
    };
    

    return (
        <div className="signup-container">
            <h1>SIGN UP</h1>
            <label className='la'>Username:</label>
            <input className='ii' type="text" value={userid} onChange={(e) => setUserId(e.target.value)} />

            <label className='la'>Password:</label>
            <input className='ii' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label className='la'>Confirm Password:</label>
            <input className='ii' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <label className='la'>Phone Number:</label>
            <input className='ii' type="text" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} />

            <div className="user-type">
                <label className='la'>User Type:</label>
                <select value={vc} onChange={(e) => setVc(e.target.value)}>
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                </select>
            </div>

            <button onClick={handleSignUp}>Sign Up</button>

            {error && <p className="error-message">{error}</p>}
        </div>
    );

}

export default SignUp;
