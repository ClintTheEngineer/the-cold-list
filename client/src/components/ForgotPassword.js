// PasswordReset.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await fetch('/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
        navigate("/")
      } else {
        setMessage('Password reset request failed.');
      }
    } catch (error) {
      console.error('Error sending password reset request:', error);
      setMessage('An error occurred while sending the request.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email address to reset your password.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
