import express from "express";
import cors from "cors";
import {controller} from "./controllers/dbController.js";
import {indexController} from "./controllers/indexController.js"


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

/**************************************************************/
/* http://localhost:3000/ */

// Get main
app.get("/", indexController.index);

// Get para obtener subs
app.get("/get-subs", controller.getSubs);

// Post para enviar subs a la DB
//app.post("/add-subs", /*controlador post*/);


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
