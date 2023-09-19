import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity
  const [registrationStatus, setRegistrationStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail.toLowerCase());
    setIsEmailValid(validateEmail(newEmail) && newEmail.trim() !== ''); // Validate email format and check for non-blank
  };

  const handleRegistration = async () => {
    if (!isEmailValid) {
      console.error('Invalid email format or blank email');
      return; // Don't submit if email is invalid or blank
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.toLowerCase(), email, password }),
      });
      const data = await response.json();
      if (response.status === 201) {
        // Redirect to another page or handle success
        setRegistrationStatus('Registration successful, navigating to Login page')
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else if (response.status === 403 || response.status === 405) {
        setRegistrationStatus(data.error);
        // Registration failed, handle the error
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
      <button onClick={() => window.location.href = '/login'}>Login</button>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="Username"
        value={username.toLowerCase()}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div style={{ maxWidth: '300px' }}> {/* Set a maximum width for the div */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          style={{ width: '100%', borderColor: isEmailValid ? 'initial' : 'red' }}
        />
        {!isEmailValid && (
          <p style={{ color: 'red', marginTop: '4px', marginBottom: '0' }}>
            Invalid email format or blank email
          </p>
        )}
      </div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegistration} disabled={!isEmailValid}>
        Register
      </button>
      <p>{registrationStatus}</p>
    </div>
  );
}

export default Register;

