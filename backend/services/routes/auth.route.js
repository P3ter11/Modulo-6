import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateJWT } from "../../auth/index.js";
import {authMiddleWare} from "../../auth/index.js";
import passport from "passport";

//ESPORTA IL ROUTER DI AUTENTICAZIONE
export const authRouter = Router();

authRouter.get("/", async (req, res, next) =>{
    res.send("Login Page");
})


//Crea un nuovo utente
authRouter.post("/register", async (req, res, next) =>{
    try {
        let user = await User.create({
            /* Crea l'utente con tutte le informazioni passate nel body */
            ...req.body, 
            /* Esclude la password perchè verrà gestita diversamente */
            password: await bcrypt.hash(req.body.password, 10)
        })
        res.send(user);
        /* sendMail(`<h1>${req.body.name} ti sei registato correttamente</h1>`, req.body.email); */
    } catch (error) {
        next(error);
    }
});

//Effettua il login
authRouter.post("/login", async(req, res, next) =>{
    try {
        let userFound = await User.findOne({email: req.body.email});

        if(userFound){
            const isPwMatching = await bcrypt.compare(req.body.password, userFound.password);

            if(isPwMatching){
                const token = await generateJWT({
                    email: userFound.email
                })
                //Genera token
                res.send({user: userFound, token});
            }else
                res.status(400).send("Utente non trovato");
        }
    } catch (error) {
        next(error);
    }
})

//Autenticazione necessaria
authRouter.get("/profile", authMiddleWare, async (req,res, next) =>{
    try {
        //utilizzando authmiddleware posso accedere all'id dell'utente
        let user = await User.findById(req.user.id);
        res.send(user);
    } catch (error) {
        next(error);
    }
})

authRouter.get("/googleLogin", passport.authenticate("google", {scope: ["profile", "email"]}))

//Non viene chiamata da frontend ma viene automaticamente presa come callback da /googleLogin
authRouter.get('/callback', passport.authenticate("google", {session: false}), (req,res,next) =>{
    try {
        res.redirect(`http://localhost:3000/profile?accessToken=${req.user.accToken}`);
    } catch (error) {
        next(error);
    }
})
