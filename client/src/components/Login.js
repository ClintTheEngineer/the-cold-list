import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import icecube from '../assets/cubemelt-melt.gif';
import { Link } from 'react-router-dom';
import '../../src/App.css';
import SignUpButton from './SignUpButton';
import { HomeButton } from './HomeButton';
import { Constants } from './Constants';


const Login = ({ setToken, setUserInfo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();
  const appName = 'The Cold List';

  useEffect(() => {
    const token = localStorage.getItem('token')
   if(token){
    navigate('/')
   }
   }, [navigate])

  const HandleLogin = async () => {
    try {
      const response = await fetch(`${Constants.SERVER_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.status === 200) {
        const token = data.token;
        const username = data.username;
        setUsername(username);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('username', username)
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      HandleLogin()
    }
  };

console.log(username);

  return (
    <div>
      <HomeButton />
      <SignUpButton />
      <h2 id='login-hdr' className='app-name'>{appName}</h2>
      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <button id='login-btn' onClick={HandleLogin} onKeyUp={handleKeyPress}>Login</button>
      <Link id='reset-pswd' title='Click here to reset your password' to="/forgot-password">Forgot Password</Link>
      <p>{errorMessage}</p>
      <img src={icecube} alt='Melting ice cube' />
    </div>
  );
}

export default Login;