import express from "express";
import {controller} from "../controllers/dbController.js";

const dbRouters = express.Router();

// Get para obtener subs
dbRouters.get("/get-subs", controller.getSubs);

// Otros Get...



export { dbRouters }