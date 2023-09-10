import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../store/actions';
import { useNavigate } from 'react-router';
import LogoutButton from './LogoutButton';
import TodoForm from './TodoForm';

export const Home = ({ token, username }) => {
  // Remove these lines as you don't need to fetch token and username here
  token = localStorage.getItem('token');
  username = localStorage.getItem('username');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a saved token and username in localStorage    
    if (!token || !username) {
      navigate('/register');
    }
  }, [username, token, navigate]);

  // Conditionally render TodoForm if both token and username are available
  const renderTodoForm = token && username ? <TodoForm /> : null;
  return (
    <>
      <h1>Icy To Do List</h1>
      <div className="user-info">
        <p>Hello, {username.toUpperCase()}</p>
      </div>      
      {renderTodoForm} {/* Conditionally render TodoForm */}<br></br>
      <LogoutButton />
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  username: state.user.username,
});

const mapDispatchToProps = {
  setUserInfo: setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
