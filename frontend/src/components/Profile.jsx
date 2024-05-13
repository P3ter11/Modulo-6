import { useContext, useEffect, useState } from "react";
import React from 'react';
import { Container } from "react-bootstrap";
import { UserContext } from "./UserContextProvider";

export default function Profile({userId}) {

    const [profile, setProfile] = useState([]);
    const {token} = useContext(UserContext); 

    console.log(token);


    useEffect(() =>{

        const fetchDataProfile = async () =>{
            try {
                const response = await fetch(`http://localhost:3001/auth/profile`,{
                    method:'GET',
                    headers:{'Authorization': `Bearer ${token}`}
                });
                if (!response.ok) throw new Error("Errore durante il recupero dei dati dell'utente")

                const data = await response.json();
                console.log(data);
                setProfile(data);

            
                
                
            } catch (error) {
                console.error("Errore durante il recupero dei dati dell'utente");
            }
    }
    fetchDataProfile();
    },[])

    
  return (
    <Container className="m-2">
      <h1>Profilo:</h1>
      <div>Nome: {profile.name}</div>
      <div>Email: {profile.email}</div>

    </Container>
  );
}


