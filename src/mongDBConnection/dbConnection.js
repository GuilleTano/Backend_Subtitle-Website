import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

//const uri = "mongodb://localhost:27017"; // DB PARA PRUEBAS

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB");

        const db = client.db("AnimeSubs");

        //const db = client.db("movie-dataset"); // DB PARA PRUEBAS

        return db;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}


export {connectDB}