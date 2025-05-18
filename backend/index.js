import express from "express"
import dotenv from "dotenv";
import connectDb from "./db/database.js";
dotenv.config();
const app = express();
// app.get("/",(req,res)=>{
//   res.json({message:"HElllo"})
  // ;})
  app.use(express.json());
connectDb();

import authrouter from "./routes/authenticate.route.js";

app.use("/auth",authrouter);

app.listen(3000,(req,res)=>{
  console.log("Server is running on port 3000");  
})