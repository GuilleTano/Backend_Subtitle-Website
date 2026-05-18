import {MongoClient} from "mongodb";

const PUERTO = process.env.PORT
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

async function connectDB() {
    try {
        console.log("PUERTO env: " + PUERTO);
        await client.connect();
        console.log("Conectado a MongoDB");

        const db = client.db("AnimeSubs");

        return db;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export {connectDB}