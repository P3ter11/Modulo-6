import React, { useState, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import { UserContext } from './UserContextProvider';

const AddPostArea = () => {

    const [formData, setFormData] = useState({
        categoria: '',
        titolo: '',
        cover: '',
        readTime: '',
        content: '',
    });

    const [isCreated, setIsCreated] = useState(null);
    const [isError, setIsError] = useState(null);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("_id");
        console.log(userId);
        try {
          const response = await fetch(`http://localhost:3001/user/${userId}/post`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),

          
          });

        if(!response.ok) {
          throw new Error(`Errore durante l'inserimento dei campi del post`);
        }

        setIsCreated(true);

        } catch (error) {
          console.error('Errore durante la registrazione di un nuovo post:', error);
          setIsError("Errore nella creazione di un nuovo post");
        }
        

      // Resetta il form dopo l'invio
      setFormData({
        categoria: '',
        titolo: '',
        cover: '',
        readTime: '',
        content: '',
      });
      };

    

      
  return (
    <div className='col-10 mx-auto'>

    
        <Form onSubmit={handleSubmit}>
        <h3>Inserisci un Post</h3>
          <Form.Group controlId="categoria" className="m-2">
            <Form.Label>Categoria*</Form.Label>
            <Form.Control
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group controlId="titolo" className="m-2">
            <Form.Label>Titolo*</Form.Label>
            <Form.Control
              type="text"
              name="titolo"
              value={formData.titolo}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group controlId="cover" className="m-2">
            <Form.Label>Cover*</Form.Label>
            <Form.Control
              type="text"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group controlId="readTime" className="m-2">
            <Form.Label>Tempo di Lettura*</Form.Label>
            <Form.Control
              as="select"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona</option>
              <option value="30">30 secondi</option>
              <option value="1m">1 minuto</option>
              <option value="5m">5 minuti</option>
              <option value="15m">15 minuti</option>
            </Form.Control>
          </Form.Group>
    
          <Form.Group controlId="content" className="m-2">
            <Form.Label>Contenuto</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </Form.Group>
    
          <Button variant="primary" type="submit" className="m-2">
            Pubblica Post
          </Button>
          {isCreated && <Alert variant='success'>Post creato con successo</Alert>}
          {isError && <Alert variant='danger'>{isError}</Alert>}
        </Form>
    </div>
      );
    
}

export default AddPostArea
