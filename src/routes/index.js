import { Router } from "express";
import { homeInit } from "../controllers/homeController.js";


const route = Router();

//home
route.get("/", homeInit)


export default route;

