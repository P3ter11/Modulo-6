import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { apiRoute } from "./services/routes/api.route.js";

config();

const PORT = process.env.PORT || 3001;


/* CREA IL SERVER */
const app = express();

/* MIDDLEWARE --> ABILITA LA COMNUICAZIONE CON DATI JSON */
app.use(express.json());

/* IMPORTA LE ROTTE */
app.use("/post", apiRoute);


/* ERRORE 404 SE NON TROVA NESSUNA ROTTA */
app.get("*", function (req, res, next){
    const error = new Error("404 Not Found!");
    error.status = 404;
    next(error);
});

/* GESTIONE DEGLI ERRORI */

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

initServer();