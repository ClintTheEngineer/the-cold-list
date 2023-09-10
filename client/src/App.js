import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import TodoForm from './components/TodoForm';
import Login from './components/Login'; 
import Register from './components/Register';
import { Home } from './components/Home';


function App() {
  const [token, setToken] = useState('');

  return (
    <div className="App">    
    <Router>
    <Routes>
    <Route path='/' exact element={<Home />} component={TodoForm} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<PrivateRoute />} isAuthenticated={token !== ''} />
    <Route path="/login" exact element={<Login setToken={setToken} />} />    
    </Routes>
    </Router>
    </div>
  );
}


export default App;