import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Routes>
    <Route {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
    </Routes>
  );
}

export default PrivateRoute;