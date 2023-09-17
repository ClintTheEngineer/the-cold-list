import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux'; // Import connect
import { setUserInfo } from '../store/actions'; // Import your action


function Login({ setToken, setUserInfo }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
   if(token){
    navigate('/')
   }
   }, [navigate])

  const HandleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.status === 200) {
        const token = data.token;
        setToken(token); // Set the token in the App component's state
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setUserInfo(token, username)
        navigate('/');
      } else if(response.status === 400){
        setErrorMessage('Login failed')
        console.error('Login failed:', response.status)
      } else if(response.status === 401){
        setErrorMessage('Incorrect username/password.')
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <button onClick={() => window.location.href = '/'}>Home</button>
      <button onClick={() => window.location.href = '/register'}>Register</button>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={HandleLogin}>Login</button>
      <a href='/forgot-password'>Forgot Password?</a>
      <p>{errorMessage}</p>
    </div>
  );
}

const mapDispatchToProps = {
  setUserInfo: setUserInfo, // Map the setUserInfo action to props
};

export default connect(null, mapDispatchToProps)(Login); // Connect to Redux