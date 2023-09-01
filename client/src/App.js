import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import TodoForm from './components/TodoForm';
import Login from './components/Login'; 


function App() {
  const [token, setToken] = useState('');

  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path="*" element={<PrivateRoute />} component={TodoForm} isAuthenticated={token !== ''} />
      <Route path="/Login" exact element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
    </div>
  );
}


export default App;