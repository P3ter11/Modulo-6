import React from 'react'
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function Users() {
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:3001/user');
          if (!response.ok) {
            throw new Error('Errore nella richiesta');
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Errore durante il recupero degli utenti:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    return (
      <Container className='mt-5'>
        <h2>Elenco Utenti</h2>
        {users.map(user => (
          <div key={user.id} className='bg-success m-2 p-2 text-light'>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </Container>
    );
  };
