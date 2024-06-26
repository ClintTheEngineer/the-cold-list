import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LogoutButton from './LogoutButton';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import list from '../assets/list.gif';


export const Home = ({ token, email }) => {
  const [refresh, setRefresh] = useState(false);
  token = localStorage.getItem('token');
  email = localStorage.getItem('email');
  const navigate = useNavigate();
  const appName = 'The Cold List';
  const username = localStorage.getItem('username');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');        
        if (!storedToken) {
            navigate('/login');
        } else {
            const storedEmail = localStorage.getItem('email');
            const storedUsername = localStorage.getItem('username');
            
            if (!storedEmail || !storedUsername) {
                navigate('/login');
            }
        }
    }, [navigate]);

    const refreshTodoList = () => {
        setRefresh(!refresh);
    }    

    return (
        <>
            <h1 className='app-name'>{appName}</h1>
            <div className="user-info">
                <p>Hello, {username ? username.toUpperCase() : 'User'}</p>
            </div>
            <TodoForm refreshTodoList={refreshTodoList} />
            <TodoList refresh={refresh} />
            <LogoutButton /> <br />
            <img id='todo-list' style={{ height:'180px'}} src={list} alt='todo-list' />
        </>
    );
};

export default Home;