import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectJwt } from '../pages/LoginPage/store/loginSlice';


export type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const jwt = useSelector(selectJwt);

  return jwt ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  )
}

export default AuthGuard;