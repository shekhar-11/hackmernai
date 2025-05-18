import express from "express";
import { signUp,login, update } from "../controllers/authenticate.controller.js";
import verifyUser from "../verifyUser.js";
const authrouter = express.Router();

authrouter.post("/signUp",signUp);
authrouter.get("/login",login);
authrouter.post("/update",verifyUser,update)
export default authrouter;
