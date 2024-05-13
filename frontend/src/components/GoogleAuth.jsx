import React from 'react';
import { Button } from 'react-bootstrap';

export function GoogleAuth() {
    const handleGoogleAuth = () =>{
        const str = "http://localhost:3001/auth/googleLogin";
        window.open(str, "_self");
    };

  return <Button variant="info" className="m-2" onClick={handleGoogleAuth}>Accedi con Google</Button>
  
}