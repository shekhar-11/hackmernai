import express from "express";
import { signUp,login, update, logout } from "../controllers/authenticate.controller.js";
import verifyUser from "../verifyUser.js";
const authrouter = express.Router();

authrouter.post("/signUp",signUp);
authrouter.get("/login",login);
authrouter.post("/update",verifyUser,update)
authrouter.get("/logout",verifyUser,logout);
export default authrouter;
