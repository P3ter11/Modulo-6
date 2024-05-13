import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { apiRoute } from "./services/routes/api.route.js";
import { userRoute } from "./services/routes/user.route.js";
import { authRouter } from "./services/routes/auth.route.js";
import { badRequestHandler, genericErrorHandler, notfoundHandler, unauthorizedHandler } from "./errorHandler.js";
import passport from "passport";
import googleStrategy from "./auth/passport.js";
import cors from "cors";

config();

const PORT = process.env.PORT || 3000;


/* CREA IL SERVER */
const app = express();

/* CORS */
app.use(cors())

/* MIDDLEWARE --> ABILITA LA COMNUICAZIONE CON DATI JSON */
app.use(express.json());

//Utilizzo google strategy
passport.use("google", googleStrategy);

/* IMPORTA LE ROTTE */
app.use("/post", apiRoute);
app.use("/user", userRoute);
app.use("/auth", authRouter);

app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(notfoundHandler);
app.use(genericErrorHandler);

/* ERRORE 404 SE NON TROVA NESSUNA ROTTA */
app.get("*", function (req, res, next){
    const error = new Error("404 Not Found!");
    error.status = 404;
    next(error);
});

/* CONNESSIONE AL SERVER */

const initServer = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connesso al server");

        app.listen(PORT, () =>{
            console.log(`Sei connesso alla porta ${PORT}`);
        })
    } catch (error) {
        console.error("Connessione al database fallita!", error);
    }
}

/* AVVIA IL SERVER */
initServer();