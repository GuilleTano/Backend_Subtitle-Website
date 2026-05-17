import { connectDB } from "../mongDBConnection/dbConnection.js";
import dotenv from "dotenv";
const controller = {};

dotenv.config();

// Get para obtener subs (por ahora datos en general)
controller.getSubs = async (req, res) => {
    try {

        const subDB = await connectDB();
        const collection = subDB.collection("subtitles");

        //const collection = subDB.collection("movies_metadata"); // DB PARA PRUEBAS

        const query = {};
        const options = {};

        const result = await collection.findOne(query, options);
        //const result = await collection.find(query, options); 
        // find() devuelve un cursor, no un array. Habrá que usar .toArray()

        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}


// Post para agregar subs  HACERLO ASI O CON SCRIPT INTERNO?
controller.addSubs = async (req, res) => {
    try {
        // Recibe el archivo y separa su contenido
        const { series, episode, filename, content } = req.body;
        // Crea un objeto con la metadata y el contenido de subtitulos
        const newSub = {
            series: series,
            episode: episode,
            filename: filename,
            content: content
        };
        // Conexion a DB
        const subDB = await connectDB();
        //const collection = subDB.collection("NOMBRE DE COLECCION");

        // AQUI DEBERIA CREARSE EL DOCUMENTO Y ENVIARSE A MONGO

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}



export { controller }


/*// QUERY DE PRUEBAS
const query = {
    original_title: "Toy Story"
};
const options = {
    projection: {
        original_title: 1
    }
};*/