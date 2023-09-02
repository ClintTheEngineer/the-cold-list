import React, { useState } from 'react';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      let response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
       console.log(data)
      if (response.status === 200) {
        setToken(data.token); // Set the token in the App component's state
      } else if(response.status === 400){
        console.error('Login failed:', response.status)
      }
    } catch (error) {
      console.error('huh', error);
    }
  };

  return (
    <div>
      <button onClick={() => window.location.href = '/'}>Home</button>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
