import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./StartPage.css"
import { FaStore, FaUser } from 'react-icons/fa';



function StartPage() {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === 'vendor' || userType === 'customer') {
      navigate('/login');
    } else {
      // Handle invalid selection
    }
  };

  return (
    <div className='hero1'>
    <div className="center-container">
      <h1>Choose your role</h1>
      <div className="role-container">
        <label className={`role-option ${userType === 'vendor' ? 'selected' : ''}`} >
          <div className="vendorbtn">
            <input
              type="radio"
              name="userType"
              value="vendor"
              onChange={() => setUserType('vendor')}
            />
            <FaStore className="icon" />
          </div>
          Technician
        </label>

        <label className={`role-option ${userType === 'customer' ? 'selected' : ''}`}>
          <div className="customerbtn">
            <input
              type="radio"
              name="userType"
              value="customer"
              onChange={() => setUserType('customer')}
            />
             <FaUser className="icon" />
          </div>
          General Public
        </label>
      </div>

      <button className="submit" onClick={handleLogin}>Choose</button>
    </div>
    </div>
  );
}

export default StartPage;