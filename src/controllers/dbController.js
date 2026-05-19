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


// Get para obtener subs (por ahora datos en general)
controller.getSubs = async (req, res) => {
    try {

        const subDB = await connectDB();
        const collection = subDB.collection("subtitles");

        const query = {
            series: "Lodoss-tou Senki - Record of Lodoss War"
        };
        const options = {
            projection: {
                _id: 0,
                content: 0,
                series: 0,
                episode: 0
            }
        };

        const result = await collection.findOne(query, options);
        //const result = await collection.find(query, options);
        // find() devuelve un cursor, no un array. Habrá que usar .toArray()

        res.json(result);

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