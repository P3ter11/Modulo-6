import React, { useContext } from 'react'
import { UserContext } from './UserContextProvider';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedAuthRoute() {
    const {authenticated, token} = useContext(UserContext);
    console.log(authenticated);
    console.log(token);
    
  return authenticated ? <Outlet/> : <Navigate to="/"/>
  
}

