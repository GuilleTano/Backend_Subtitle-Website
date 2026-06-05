import fs from "fs/promises";
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

const uploads = "./uploads";
const fileList = await fs.readdir(uploads); // Lee el directorio y devuelve un array con los nombres de los archivos

async function uploadFiles() {

    const subDB = await connectDB();
    const collection = subDB.collection("subtitles");

    for (let file of fileList) {

        if (path.extname(file) !== ".ass") continue

        const fileName = file;
        const namePart = path.parse(fileName).name.split("_", 2);
        const pathFile = path.join(uploads, fileName);
        const contentFile = await fs.readFile(pathFile, "utf-8");

        const objSub = {
            series: namePart[0],
            episode: parseInt(namePart[1], 10),
            filename: fileName,
            content: contentFile
        }

        const sub = await collection.findOne({ filename: fileName });
        if (sub) {
            console.log("Ya existe " + fileName);
            continue
        }

        await collection.insertOne(objSub);

        console.log("Se subió: " + fileName);
        //break
    }
}

uploadFiles();