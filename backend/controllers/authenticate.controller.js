// backend/controllers/authenticate.controller.js
import  jwt  from "jsonwebtoken";
import { errorHandler } from "../error/error.js";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username:username.toLowerCase(),
      email,
      password, // consider hashing
    });

    const createdUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
      },
    });
  } catch (error) {
    error.status = 500;
    error.message = "Error creating user";
    return errorHandler(error, res);
  }
};






   


export { signUp };
