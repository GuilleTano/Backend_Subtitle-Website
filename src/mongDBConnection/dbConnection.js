import {MongoClient} from "mongodb";

//const URL = process.env.MONGODB_URI;
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function connectDB() {
    
    try {
        await client.connect();
        console.log("Conectado a MongoDB");

        //const db = client.db("NOMBRE DE LA DB");
        const db = client.db("movie-dataset");

        return db;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }

}


export {connectDB}