import { Router } from "express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comments.model.js";

export const userRoute = Router();

//Ritorna tutti gli utenti
userRoute.get("/", async (req, res, next) =>{
    try {
        let users = await User.find().populate("posts");
        res.send(users);
        
    } catch (error) {
        next(error);
    }
    
})

//Ritorna un utente
userRoute.get("/:id", async (req, res, next) =>{
    try {
        let user = await User.findById(req.params.id).populate("posts");
        res.send(user);
        
    } catch (error) {
        next(error);
    }
    
})

//Aggiungo un utente
userRoute.post("/", async (req, res, next) => {
    try {
        let user = await User.create(req.body);
        res.send(user);
    } catch (error) {
        next(error)
    }
})

//Aggiungo un post ad un utente
userRoute.post("/:id/post", async (req, res, next) =>{
    try {
        let user = await User.findById(req.params.id);
        if (!user) next(error)

        let post = await Post.create({...req.body, user: user});
        user.posts.push(post._id)

        await user.save();

        res.send(post);

    } catch (error) {
        next(error);
    }
})

//Elimino un utente
userRoute.delete("/:id", async(req, res, next) =>{
    try {
        let user = await User.findByIdAndDelete(req.params.id);
        if(!user) next(error)

        res.send(204);
    } catch (error) {
        next(error);
    }
})



//Modifico il commento di un utente
userRoute.put("/:postId/:commentId", async(req, res, next) =>{
    
    const {postId, commentId} = req.params; //Prendo gli ID dell'url e li definisco in base a user e comment
    const { content } = req.body;

    try {
        let post = await Post.findById(postId); 
        if(!post) next(error);

        //Cerco l'id comment nell'user passato come id, se non lo trova restituisce -1
        let commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId); 
        if(commentIndex === -1) next(error);

        await Comment.findByIdAndUpdate(commentId ,{content}, {new: true});

        await post.save();
        res.send(post.comments);


    } catch (error) {
        next(error)
        
    }
})


