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
import generate from "./routes/user.routes.js";
import authrouter from "./routes/authenticate.route.js";
import cookieParser from "cookie-parser";
import userProgressRouter from './routes/userProgress.route.js';
app.use(cookieParser())
app.use("/api",authrouter);
app.use("/api",generate);
app.use('/api', userProgressRouter);
app.listen(3000,(req,res)=>{
  console.log("Server is running on port 3000");  
})