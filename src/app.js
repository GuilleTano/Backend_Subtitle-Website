import express from "express";
import cors from "cors";
import { indexRouters } from "./routes/indexRouters.js";
import { dbRouters } from "./routes/dbRouters.js";

/********************* TODO ESTO PARA NO TENER QUE USAR LA BASURA DE DOTENV ************************/
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");
loadEnvFile(envPath);
/***************************************************************************************************/

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(indexRouters);
app.use(dbRouters);


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
/* http://localhost:3000/ */