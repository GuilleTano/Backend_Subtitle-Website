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


// FORMULARIO DONDE CARGAR LOS DATOS DE LA SERIE Y SU IMAGEN
const newImage = {
    name: "Natsu no Arashi!",
    slug: "natsu-no-arashi",
    type: "jpg"
}

async function uploadSerie(newImage) {

    const subDB = await connectDB();
    const collection = subDB.collection("series");

    const serie = await collection.findOne({ name: newImage.name });
    if (serie) {
        console.log("Ya existe " + newImage.name);
        return
    }

    const newSerie = {
        name: newImage.name,
        slug: newImage.slug
    };

    const mimeTypes = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        webp: "image/webp"
    };

    const imagePath = path.resolve(
        __dirname,
        `../uploader/image/${newSerie.name}.${newImage.type}`
    );

    let imageBuffer;
    try {
        imageBuffer = await fs.readFile(imagePath);
    } catch {
        console.log(`No se encontró la imagen: ${imagePath}`);
        return;
    }

    newSerie.image = {
        mimeType: mimeTypes[newImage.type],
        data: imageBuffer.toString("base64")
    };

    await collection.insertOne(newSerie);

    console.log(`Se subió: ${newImage.name}`);
}

uploadSerie(newImage);