import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { UserContext } from './UserContextProvider';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton(){
    const {setToken} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () =>{
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("_id");
        localStorage.removeItem("name");
        navigate("/");
      
    }
    
  return (
    <Button variant='primary' onClick={handleLogout}>Logout</Button>
  )
}


