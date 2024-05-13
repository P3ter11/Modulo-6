import { Router } from "express";
import Post from "../models/post.model.js";
import Comment from "../models/comments.model.js";
import cloudinaryMiddleware from "../middlewares/multer.js";

export const apiRoute = Router();

//Ritorna tutti i post di un utente
apiRoute.get("/:id/posts", async (req, res) => {
    try {
      let posts = await Post.find();
      res.send(posts);
    } catch (err) {
      next(err);
    }
  });

/* Visiona tutti i post dell'api */
/* apiRoute.get("/", async (req, res) =>{
    let posts = await Post.find();
    res.send(posts);
}); */


/* Visiona il post con l'id associato */
apiRoute.get("/:id", async (req, res, next) =>{
    try{
        let post = await Post.findById(req.params.id).populate("comments");
        res.send(post);
    }catch(err){
        next(err);
    }
})

//modifica il post con l'id associato
apiRoute.put("/:id", async (req, res) => {
try {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(post);
} catch (err) {
    next(err);
}
});

//Aggiungo il commento ad un post
apiRoute.post("/:postId", async(req, res, next) =>{
    try {
        let post = await Post.findById(req.params.postId).populate("comments");
        let comment = await Comment.create({...req.body, posts: post});

        post.comments.push(comment);

        await post.save();
        res.send(comment);

    } catch (error) {
        next(error);
    }

})

//Elimino il post ad un utente
apiRoute.delete("/:postId", async(req, res, next) =>{
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.send(204);
    } catch (error) {
        next(error);
        
    }
})


/* Effettua un ordinamento in base alla categoria dalla a alla z */
apiRoute.get("/category/:order", async (req, res, next) => {
    try {
        let posts = await Post.find().sort({
            categoria: -1
        });
        res.send(posts);
    } catch (err) {
        next(err);
    }
});

apiRoute.patch("/:id/cover", cloudinaryMiddleware, async (req, res, next) => {
    try {
      // Andiamo a prendere l'utente con l'id specifico e andiamo ad aggiornare la sua prorietà avatar
      // Con {new: true} stiamo dicendo di restituire la versione più aggiornata del documento
      let updatedCover = await Post.findByIdAndUpdate(
        req.params.id,
        { cover: req.file.path },
        { new: true }
      );
  
      // Mandiamo come risposta l'utente aggiornato
      res.send(updatedCover);
    } catch (error) {
      // Gestiamo gli eventuali errori
      next(error);
    }
  });

  //Ritorna tutti i commenti di un post
  apiRoute.get("/:idPost/comments", async(req, res, next) =>{
    try {
        let post = await Post.findById(req.params.idPost).populate('comments');
        
        if(!post)
            return res.status(404).json({message: 'Post non trovato'});

        const comments = post.comments;

        res.status(200).json({comments});

    } catch (error) {
        next(error);
    }
  })

  //Elimino il commento in un post specifico
apiRoute.delete("/:postId/comment/:commentId", async (req, res, next) =>{
    const {postId, commentId} = req.params;

    try {
        const post = await Post.findById(postId);

        //Mi controlla che esiste un commento, ritrna 404 se non trova nulla
        let commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);
        if(commentIndex === -1) {
            const error = new Error('Commento non trovato');
            error.status = 404;
            throw error;
        }

        await Comment.findByIdAndDelete(commentId);
        res.sendStatus(204);
        console.log("commento eliminato: ",commentId);
        

        
    } catch (error) {
        next(error);
        
    }
})
