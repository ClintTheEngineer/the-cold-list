import React from 'react';
//import { useDispatch } from 'react-redux'; // If using Redux
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  //const dispatch = useDispatch(); // If using Redux
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Optionally, clear user-related data from Redux store
    // dispatch(logoutAction()); // Dispatch your logout action if using Redux

    // Redirect to the login page or another page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
}

export default LogoutButton;
