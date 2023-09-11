import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../store/actions';
import { useNavigate } from 'react-router';
import LogoutButton from './LogoutButton';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export const Home = ({ token, username }) => {
    const [refresh, setRefresh] = useState(false);
    const refreshTodoList = () => {
        setRefresh(!refresh)
    }
  
  token = localStorage.getItem('token');
  username = localStorage.getItem('username');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a saved token and username in localStorage    
    if (!token || !username) {
      navigate('/register');
    }
  }, [username, token, navigate]);

  return (
    <>
      <h1>Icy To Do List</h1>
      <div className="user-info">
        <p>Hello, {username.toUpperCase()}</p>
      </div>      
      <TodoForm refreshTodoList={refreshTodoList}/>
      <TodoList refresh={refresh} />
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
