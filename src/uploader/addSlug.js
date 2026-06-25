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

function generateSlug(text) {
    return text
        .normalize("NFD")                 // Separa las letras de los acentos
        .replace(/[\u0300-\u036f]/g, "")  // Elimina los acentos
        .toLowerCase()                    // Minúsculas
        .trim()                           // Quita espacios al inicio y final
        .replace(/\s+/g, "-")             // Espacios -> -
        .replace(/[^a-z0-9-]/g, "")       // Elimina caracteres especiales
        .replace(/-+/g, "-");             // Evita "--"
}

async function addAttribute() {

    const serie = "Natsu no Arashi!"
    const slug = generateSlug(serie);

    const subDB = await connectDB();
    const collection = subDB.collection("subtitles");

    const result = await collection.updateMany(
        { series: serie },
        {
            $set: {
                slug: slug
            }
        }
    );

    console.log(`Se agregó el slug: ${slug} a ${serie}`);
    console.log(`Se actualizó "${serie}" (${result.modifiedCount} documentos).`
);
}

addAttribute();