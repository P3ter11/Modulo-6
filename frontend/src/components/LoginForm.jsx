import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContextProvider';
import './styles.css';
import { GoogleAuth } from './GoogleAuth';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(false);

  const {token, setToken} = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userLogin = await response.json();
        localStorage.setItem('_id', userLogin.user._id);
        localStorage.setItem('token', userLogin.token);
        localStorage.setItem('name', userLogin.user.name);
        setToken(userLogin.token);
        
      } else{
        throw new Error('Errore durante il login');
      }
      
      
    } catch (error) {
      console.error('Errore durante il login:', error);
      setError("Credenziali non valide! Riprova");
    }
  };

  useEffect(() => {
    if (token !== "") navigate("/home");
  }, [token]);

  return (
    <Form onSubmit={handleSubmit} className='form-access'>
        <h2>Accedi</h2>
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
        Accedi
      </Button>
        
      <GoogleAuth/>

      <Link to="/">
            <Button variant="secondary" type="submit" className='m-2'>Torna a StriveBlog</Button>
        </Link>
      {error && <Alert variant='danger' className='m-2'>{error}</Alert>}
    </Form>
  );
};

export default LoginForm;