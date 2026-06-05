import path from "node:path";
/********************* TODO ESTO PARA NO TENER QUE USAR LA BASURA DE DOTENV ************************/
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");
loadEnvFile(envPath);
/***************************************************************************************************/

// IMPORTACION DINAMICA DE connectDB (espera que se lea el script actual (y carguen las .env) antes de ejecutarse)
const { connectDB } = await import("../mongDBConnection/dbConnection.js");

async function removeFile() {

    const subFile = "filename"

    const subDB = await connectDB();
    const collection = subDB.collection("subtitles");

    const result = await collection.deleteOne({
        filename: subFile
    });

    if (result.deletedCount === 0) {
        console.log("No existe " + subFile);
        return;
    }

    console.log("Se eliminó " + subFile);
}

removeFile();