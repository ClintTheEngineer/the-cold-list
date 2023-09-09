import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../store/actions';

export const Home = ({ token, username }) => {
    console.log(username)
    useEffect(() => {
        // Check if there's a saved token and username in localStorage
        const savedToken = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('username');
    
        if (savedToken && savedUsername) {
          // If found, set the user info in Redux
          setUserInfo(setUserInfo(savedToken, savedUsername));
        }
      }, []);
    
    console.log(token, username)

  return (
    <>
      <h1>Icy To Do List</h1>
      <div className="user-info">
        <p>Hello, {username}</p>          

      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
    token: state.user.token,
    username: state.user.username
})

const mapDispatchToProps = {
    setUserInfo: setUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)