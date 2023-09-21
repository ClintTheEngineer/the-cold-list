import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux'; 
import { setUserInfo } from '../store/actions'; 
import icecube from '../assets/cubemelt-melt.gif';
import '../../src/App.css';


const Login = ({ setToken, setUserInfo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        setToken(token);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      HandleLogin()
    }
  };



  return (
    <div>
      <button id='home-btn' onClick={() => window.location.href = '/'}>Home</button>
      <button id="sign-up-btn" onClick={() => window.location.href = '/register'} title='Create an account'>Sign Up</button>
      <h2 id='login-hdr' className='app-name'>{appName}</h2>
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
        onKeyUp={handleKeyPress}
      />
      <button id='login-btn' onClick={HandleLogin} onKeyUp={handleKeyPress}>Login</button>
      <a id='reset-pswd' href='/forgot-password' title='Click here to reset your password'>Forgot Password?</a>
      <p>{errorMessage}</p>
      <img src={icecube} alt='Melting ice cube' />
    </div>
  );
}

const mapDispatchToProps = {
  setUserInfo: setUserInfo,
};

export default connect(null, mapDispatchToProps)(Login);