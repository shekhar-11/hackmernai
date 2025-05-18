// backend/controllers/authenticate.controller.js
import  jwt  from "jsonwebtoken";
import { errorHandler } from "../error/error.js";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() }
      ],
    });

    if (existingUser) {
      if (existingUser.username === username.toLowerCase()) {
        return res.status(400).json({ message: "Username already taken" });
      }
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user
    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password, // In a production app, you should hash the password
    });

    const createdUser = await newUser.save();

    // Generate authentication token
    const token = jwt.sign(
      { id: createdUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set authentication cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Return success response
    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
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

    const isPasswordValid = () => {
      return user.password === password;
    };

    if (!isPasswordValid()) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Extended token expiration to 24 hours
    );

    // Set cookie with proper options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    });

    return res.status(200).json({
      message: "Login successful",
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
  try {
    const userId = req.user.id;
    const { username, email, password } = req.body;

    // Validate input
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Check if username is already taken by another user
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
      _id: { $ne: userId } // Exclude current user from check
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Prepare update data
    let updateData = {
      username: username.toLowerCase()
    };

    // Only include email and password if they are provided
    if (email) {
      // Check if email is already taken
      const emailExists = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: userId }
      });

      if (emailExists) {
        return res.status(400).json({ message: "Email already registered" });
      }
      updateData.email = email.toLowerCase();
    }

    if (password) {
      updateData.password = password;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from response
    const { password: pass, ...userWithoutPassword } = updatedUser._doc;

    return res.status(200).json({
      message: "Profile updated successfully",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Update error:', error);
    error.status = 500;
    error.message = "Error updating user";
    return errorHandler(error, res);
  }
};


const logout = async (req, res) => {
  try {
    // Clear the token cookie with the same options used when setting it
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0) // Set expiration to the past
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    error.status = 500;
    error.message = "Error logging out user";
    return errorHandler(error, res);
  }
};



export { signUp,login,update,logout };
