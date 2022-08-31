import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux';

const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();

  const { isAuth, loading } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!loading && !isAuth) navigate('/signin?check=true');
  }, [navigate, loading, isAuth]);

  return <>{!loading && isAuth ? children : null}</>;
};

export default ProtectedRoute;
