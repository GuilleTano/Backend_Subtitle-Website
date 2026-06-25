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

// Obtener lista de animes
controller.getSeriesList = async (req, res) => {
    try {
        const subDB = await connectDB();
        const collection = subDB.collection("series");

        const result = await collection.find({}).toArray();

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo procesar la solicitud' });
    }
}

// Obtener info de un anime especifico
controller.getSerie = async (req, res) => {
    try {
        const subDB = await connectDB();
        const collection = subDB.collection("series");

        const serie = await collection.findOne({
            slug: req.params.anime
        });

        if (!serie) {
            return res.status(404).json({
                error: "Serie no encontrada"
            });
        }

        res.json(serie);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "No se pudo procesar la solicitud"
        });
    }
};

// Obtener subs de un anime especifico
controller.getSubs = async (req, res) => {
    try {
        const subDB = await connectDB();
        const collection = subDB.collection("subtitles");

        const query = {
            slug: req.params.anime
        };
        const options = {
            projection: {
                _id: 0,
                content: 0,
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