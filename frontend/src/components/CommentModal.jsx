import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';

export default function CommentModal({postId}){
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showComments, setShowComments] =useState(false);

  const [newComment, setNewComment] = useState('');

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCommentChange = (e) => setNewComment(e.target.value);

  useEffect(() =>{
    const fetchComments = async () =>{
      try {
        const response = await fetch(`http://localhost:3001/post/${postId}/comments`);
        if (!response.ok) 
          throw new Error("Errore durante il recupero dei commenti");

        const data = await response.json();
        setComments(data.comments);
        
        
      } catch (error) {
        console.error("Errore durante il recupero dei commenti: ", error);
      }
    }
    
      fetchComments();
    
  }, [showModal, postId])

  const handleSubmitComment = async () =>{
    try {
      const response = await fetch(`http://localhost:3001/post/${postId}`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({content: newComment})
      });

      if(!response.ok) 
        throw new Error("Errore durante l'aggiunta del commento");

      

      handleCloseModal();

      setComments('');

    } catch (error) {
      console.error("Errore durante l'aggiunta di un commento: ", error);
    }
  }

  return (
    <>
    <Button variant="dark" onClick={handleShowComments} className='my-2'>Visualizza commenti</Button>
      {showComments && (
        <ul>
          {comments.map(comment =>(
            <div className='d-flex'>
              <li key={comment._id}>{comment.content}</li>
            </div>
          ))}
        </ul>
      )}

    <Button onClick={handleShowModal}>Inserisci commento</Button>

    <Modal show={showModal} onHide={handleCloseModal}>

      <Modal.Body>
        <Form.Group controlId="formComment">
          <Form.Label>Inserisci commento:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={handleCommentChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Chiudi
        </Button>
        <Button variant="primary" onClick={handleSubmitComment}>
          Commenta
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

