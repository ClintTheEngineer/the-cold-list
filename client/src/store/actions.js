// src/store/actions.js

export const setUserInfo = (token, username) => ({
    type: 'SET_USER_INFO',
    token,
    username,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  