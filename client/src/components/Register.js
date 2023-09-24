import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeButton } from './HomeButton';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true); 
  const [registrationStatus, setRegistrationStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail.toLowerCase());
    setIsEmailValid(validateEmail(newEmail) && newEmail.trim() !== ''); 
  };

  const handleRegistration = async () => {
    if (!isEmailValid) {
      console.error('Invalid email format or blank email');
      return;
    }

    try {
      const response = await fetch('https://filthy-sweatshirt-boa.cyclic.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.toLowerCase(), email, password }),
      });
      const data = await response.json();
      if (response.status === 201) {
        setRegistrationStatus('Registration successful, navigating to Login page')
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else if (response.status === 403 || response.status === 405) {
        setRegistrationStatus(data.error);
      } else if (response.status === 406) {
        setRegistrationStatus(data.error);
      } else {
        console.error('Registration failed:', JSON.parse(data));
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <HomeButton />
      <h2 id='register'>Registration</h2>
      <input
        type="text"
        placeholder="Username"
        value={username.toLowerCase()}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div id='sign-up-form'> 
        <input
          id='email'
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          style={{ borderColor: isEmailValid ? 'initial' : 'red' }}
        />
        {!isEmailValid && (
          <p style={{ color: 'red', marginTop: '4px', marginBottom: '0' }}>
            Invalid email format or blank email
          </p>
        )}
      </div>
      <input
        id='pswd-register'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button id='register-btn' onClick={handleRegistration} disabled={!isEmailValid}>
        Register
      </button>
      <p>{registrationStatus}</p>
    </div>
  );
}

export default Register;