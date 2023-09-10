import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

useEffect((token = localStorage.getItem('token')) => {
  console.log(token, username)
 if(token){
  navigate('/')
 }
 }, [navigate, username])


  const handleRegistration = async () => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      //const data = await response.json();
      
      if (response.status === 201) {
        // Registration was successful, you can redirect or show a success message
        console.log('Registration successful');
        // Redirect to another page or handle success
        navigate('/login')
      } else {
        // Registration failed, handle the error
        console.error('Registration failed:', response.error, response.status);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
}

export default Register;