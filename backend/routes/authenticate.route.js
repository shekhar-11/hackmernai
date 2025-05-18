import express from "express";
import { signUp,login, update, logout } from "../controllers/authenticate.controller.js";
import verifyUser from "../verifyUser.js";
const authrouter = express.Router();

authrouter.post("/auth/signUp",signUp);
authrouter.post("/auth/login",login);
authrouter.post("/auth/update",verifyUser,update)
authrouter.get("/auth/logout",verifyUser,logout);
export default authrouter;
