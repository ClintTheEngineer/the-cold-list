// ResetPassword.js
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
 
  useEffect(() => {
    // Extract the token from the URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = queryParams.get('token');

    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
  }, []);
 
 
 
 //const { token } = useParams(); 
 const navigate = useNavigate();
//const { token } = match.params;
console.log(token)
 //const token = localStorage.getItem('token')
 console.log(token)
  useEffect(() => {
    // Function to validate the token
    const validateToken = async () => {
      try {
        // Make an API request to validate the token
        const response = await fetch(`/validate-password/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          // Token is valid, allow the user to reset their password
          setMessage('Token is valid. You can reset your password.');
          console.log(response.status)
        } else {
          // Token is invalid or expired, show an error message
          setMessage('Invalid or expired token. Please request a new password reset link.');
          // You can also disable the form or take other appropriate actions here
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setMessage('An error occurred while validating the token.');
      }
    };
  
    // Call the validateToken function when the component mounts
    validateToken();
  }, [token]);
  

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

  // Check password requirements
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.match(passwordRegex)) {
    setMessage('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 symbol.');
    return;
  }

      // Make an API request to reset the password using the token
      const response = await fetch(`/reset-password/${token}`, {
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