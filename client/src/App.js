import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import Login from './components/Login'; 
import Register from './components/Register';
import { Home } from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';


function App() {
  const [token, setToken] = useState('');

  return (
    <div className="App">    
    <Router>
    <Routes>
    <Route path='/' exact element={<Home />} component={TodoForm} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/login" exact element={<Login setToken={setToken} />} />    
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/validate-password/:token" component={token} element={<ResetPassword />} />
    </Routes>
    </Router>
    </div>
  );
}


export default App;