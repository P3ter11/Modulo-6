import React , {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from './UserContextProvider';

export const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email:"",  
        password: ""
    });

    const {setNameData} = useContext(UserContext);
   

    const handleChange = (e) =>{
        //prende i dati del form e li sostituisce con quelli nuovi (in questo caso il .name si riferisce ad input name)
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })

            if(!response.ok){
                throw new Error('Errore durante la registrazione');
            }

            setNameData(formData.name)
            navigate("/login");
        } catch (error) {
            console.error('Errore durante la registrazione:', error);
        }
    }
  return (
    <Form onSubmit={handleSubmit} className="form-access">
        <h2>Registrati</h2>
      <Form.Group controlId="formName" className='m-2'>
        <Form.Label>Nome</Form.Label>
        <Form.Control 
          type="text" 
          name="name" 
          placeholder="Inserisci il tuo nome" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className='m-2'>
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          name="email" 
          placeholder="Inserisci la tua email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className='m-2'>
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          name="password" 
          placeholder="Inserisci la tua password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Button variant="primary" type="submit" className='m-2'>
        Registrati
      </Button>
      
        <Link to="/">
            <Button variant="secondary" type="submit" className='m-2'>Torna a StriveBlog</Button>
        </Link>
    </Form>
  )
};

export default RegistrationForm;
