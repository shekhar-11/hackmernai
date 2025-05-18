// backend/db/db.js
import mongoose from "mongoose";
import { errorHandler } from "../error/error.js"; // ✅ fix typo in file name

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/Hackmern`
    );
    console.log(`\nMongoDB connected!! DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    error.status = 500;
    error.message = "Error connecting to database";
    errorHandler(error, {
      status: (code) => ({ json: (obj) => console.error(code, obj) }), // mock res
    });
    process.exit(1);
  }
};

export default connectDb;
