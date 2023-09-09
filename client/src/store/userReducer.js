// src/store/userReducer.js

const initialState = {
    token: '', // Store the user's token here
    username: '', // Store the user's username here
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_INFO':
        return {
          ...state,
          token: action.token,
          username: action.username,
        };
      case 'LOGOUT':
        return initialState; // Clear user info on logout
      default:
        return state;
    }
  };
  
  export default userReducer;
  