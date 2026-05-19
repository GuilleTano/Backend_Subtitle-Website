import express from "express";
import { controller } from "../controllers/indexController.js";

const indexRouters = express.Router();

// Get main
indexRouters.get("/", controller.index);


export { indexRouters }