import express from "express";
import {controller} from "../controllers/dbController.js";

const dbRouters = express.Router();

// Pedir la lista de series
dbRouters.get("/series", controller.getSeriesList);

// Pedir info de una serie especifica
dbRouters.get("/series/:anime", controller.getSerie);

// Pedir la lista de subs de una serie
dbRouters.get("/subtitles/:anime", controller.getSubs);


export { dbRouters }