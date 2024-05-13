import React, {useContext, useState} from 'react'
import { Alert, Button } from 'react-bootstrap'
import { UserContext } from './UserContextProvider'

const ButtonDelete = ({postId, setDeletedPost}) => {
    
    const handleDelete = async () =>{
        try {
            const response = await fetch(`http://localhost:3001/post/${postId}`, {
                method: "DELETE",
                headers:{"Content-Type": "application/json"}
            })
            if (response.ok) {
                setTimeout(() => setDeletedPost(true), 3000);
                setDeletedPost(false);
            }else{
                throw new Error("Errore durante l'eliminazione del post");
            }
            

        } catch (error) {
            console.error("Errore durante l'eliminazione del post:", error);
        }
    }

  return (
    <Button variant='danger' onClick={handleDelete}>Elimina Post</Button>
  )
}

export default ButtonDelete;
