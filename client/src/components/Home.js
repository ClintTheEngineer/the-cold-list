import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../store/actions';
import { useNavigate } from 'react-router';
import LogoutButton from './LogoutButton';
import TodoForm from './TodoForm';
import TodoList from './TodoList';


export const Home = ({ token, username }) => {
  const [refresh, setRefresh] = useState(false);
  token = localStorage.getItem('token')
  username = localStorage.getItem('username');
  const navigate = useNavigate();
  const appName = 'The Cold List';
    

    useEffect(() => {
        // Check if there's a saved token in localStorage
        const storedToken = localStorage.getItem('token');
        
        if (!storedToken) {
            // If there's no token, redirect to the login page
            navigate('/login');
        } else {
            // If token exists, retrieve the username
            const storedUsername = localStorage.getItem('username');
            
            if (!storedUsername) {
                // If there's no username, redirect to the login page
                navigate('/login');
            }
        }
    }, [navigate]);

    const refreshTodoList = () => {
        setRefresh(!refresh);
    }
    

    return (
        <>
            <h1>{appName}</h1>
            <div className="user-info">
                <p>Hello, {username ? username.toUpperCase() : ''}</p>
            </div>
            <TodoForm refreshTodoList={refreshTodoList} />
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

