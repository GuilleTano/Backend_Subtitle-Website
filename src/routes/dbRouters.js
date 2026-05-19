import express from "express";
import {controller} from "../controllers/dbController.js";

const dbRouters = express.Router();

// Pedir la lista de subs de una serie
dbRouters.get("/get-subs/:anime", controller.getSubs); // /get-subs/Lodoss-tou Senki - Record of Lodoss War

// Pedir la lista de series
dbRouters.get("/get-series", controller.getSeries);


export { dbRouters }