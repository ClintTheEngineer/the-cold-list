import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../store/actions';

export const Home = ({ token, username }) => {
    token = localStorage.getItem('token');
    username = localStorage.getItem('username');
    console.log(token)
    useEffect(() => {
        // Check if there's a saved token and username in localStorage    
        if (token && username) {
          // If found, set the user info in Redux
          console.log(username)
        }
      }, [username, token]);
    
    console.log(token, username)

  return (
    <>
      <h1>Icy To Do List</h1>
      <div className="user-info">
        <p>Hello, {username.toUpperCase()}</p>    
        <p>{token}</p>      

      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
    token: state.user.token,
    username: state.user.username,
  });
  
  const mapDispatchToProps = {
    setUserInfo: setUserInfo, // Map the setUserInfo action to props
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home); // Connect to Redux