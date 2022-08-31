import React, { useEffect } from 'react';
import { Home, SignIn, SignUp } from './pages';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components';
import { authActions, useAppSelector } from './redux';
import fire from './utils/swal';

const App = () => {
  const { error: authError } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (authError) fire(authError);

    authActions.clearErrors();
  }, [authError]);

  useEffect(() => {
    const func = async () => {
      await authActions.loadUser();
      authActions.clearErrors();
    };
    func();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
