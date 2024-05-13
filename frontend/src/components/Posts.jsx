import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import ButtonDelete from './ButtonDelete';
import "./styles.css";
import CommentModal from './CommentModal';

const PostCard = () => {
  const [posts, setPosts] = useState([]);

  const userId = localStorage.getItem("_id");

  const [deletedPost, setDeletedPost] = useState(null);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/post/${userId}/posts`);
      if (!response.ok) {
        throw new Error('Errore durante il recupero dei post');
      }
      const data = await response.json();
      setPosts(data);

    } catch (error) {
      console.error('Errore durante il recupero dei post:', error);
    }
  };

  useEffect(() =>{
    fetchUserPosts();
  },[]);

  return (
    <div>
      <Button className="m-2" onClick={fetchUserPosts}>Aggiorna</Button>
      <div className='d-flex flex-wrap justify-content-between'>
      {posts === 0 ? <h1>Ancora nessun post pubblicato</h1> : posts.map((post) => (
        <Card key={post._id} className="m-2 card-post">
          <Card.Img variant="top" src={post.cover} style={{maxHeight: "200px", objectFit: "cover"}}/>
          <Card.Body>
            <Card.Title>{post.titolo}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <Card.Text>Categoria: {post.categoria}</Card.Text>
            <ButtonDelete postId={post._id} setDeletedPost={setDeletedPost}/>
            
            <CommentModal postId={post._id}/>
          </Card.Body>
        </Card>
      
      ))}
      </div>
      {deletedPost && <Alert variant='success' className='m-2'>Post eliminato con successo!</Alert>}
      
    </div>
  );
};

export default PostCard;