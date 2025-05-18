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




const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid =  () => {
      return  user.password === password;
    };

    if (!isPasswordValid()) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    error.status = 500;
    error.message = "Error logging in user";
    return errorHandler(error, res);
  }
};


const update = async (req, res) => {
  const userId = req.user._id|| req.user.id;  

  
  const { username, email, password } = req.body;  

  try {
   
    let updatedData = { username,password };

    if (password) {
     
    updatedData.password = password;
    

    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const { password: pass, ...userWithoutPassword } = updatedUser._doc || updatedUser;

    return res.status(200).json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    error.status = 500;
    error.message = "Error updating user";
    return errorHandler(error, res);
  }
};



export { signUp,login,update };
