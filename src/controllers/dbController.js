/********************* TODO ESTO PARA NO TENER QUE USAR LA BASURA DE DOTENV ************************/
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");
loadEnvFile(envPath);
/***************************************************************************************************/

const { connectDB } = await import("../mongDBConnection/dbConnection.js");
const controller = {};


// Get para obtener lista de animes
controller.getSeries = async (req, res) => {
    try {
        const subDB = await connectDB();
        const collection = subDB.collection("subtitles");

        const result = await collection.distinct("series");
        result.sort();

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}

// Get para obtener subs de un anime especifico
controller.getSubs = async (req, res) => {
    try {
        const subDB = await connectDB();
        const collection = subDB.collection("subtitles");

        const query = {
            series: req.params.anime
        };
        const options = {
            projection: {
                _id: 0,
                content: 0,
                filename: 0
            }
        };

        const cursor = await collection.find(query, options).sort({ episode: 1 });
        const result = await cursor.toArray();

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}

export { controller }