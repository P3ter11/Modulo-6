import { Router } from "express";
import Post from "../models/post.model.js";
import cloudinaryMiddleware from "../middlewares/multer.js";

export const apiRoute = Router();

apiRoute.get("/", async (req, res) => {
    try {
      let posts = await Post.find({ content: { $ne: null } });
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
        let post = await Post.findById(req.params.id);
        res.send(post);
    }catch(err){
        next(err);
    }
})


apiRoute.put("/:id", async (req, res) => {
try {
    let post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(post);
} catch (err) {
    next(err);
}
});

apiRoute.post("/", async (req, res, next) => {
    try {
        let post = await Post.create(req.body);
        res.send(post).status(400);
    } catch (err) {
        next(err);
    }
});

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
      // Con {new: true} stiamo dicendo di restiuirsci la versione più aggiornata del documento
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
