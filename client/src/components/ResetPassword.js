import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = queryParams.get('token');

    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
    if (!tokenFromQuery) {
      navigate('/')
    }
  }, [navigate]);
 
 
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`https://filthy-sweatshirt-boa.cyclic.app/validate-password/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          setMessage('Token is valid. You can reset your password.');
          console.log(response.status)
        } else {
          setMessage('Invalid or expired token. Please request a new password reset link.');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setMessage('An error occurred while validating the token.');
      }
    };
    validateToken();
  }, [token]);
  
  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.match(passwordRegex)) {
    setMessage('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 symbol.');
    return;
  }
  
      const response = await fetch(`https://filthy-sweatshirt-boa.cyclic.app/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
        navigate('/')
      } else {
        setMessage('Password reset failed.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred while resetting the password.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <p>Enter your new password.</p>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;