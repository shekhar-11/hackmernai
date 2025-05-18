import express from "express";
import { signUp } from "../controllers/authenticate.controller.js";
const authrouter = express.Router();

authrouter.post("/signUp",signUp);

export default authrouter;