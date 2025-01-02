import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../models/user.js";
import validator from "validator";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Login Controller
const loginController = async (req, res) => {
  try {
    if (req.body.googleToken) {
      const googleToken = req.body.googleToken;

      // Verify Google token
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload) {
        return res.status(400).send({ message: "Google Auth Failed", success: false });
      }

      // Check if user exists based on Google email
      let existingUser = await user.findOne({ email: payload.email });

      // If user doesn't exist, create a new user
      if (!existingUser) {
        existingUser = new user({
          email: payload.email,
          name: payload.name,
          password: "", // Google doesn't need a password
          authProvider: 'google',
          isFreelancer: req.body.role === "user",  // Role based on provided role
          isEmployee: req.body.role === "org",     // Role based on provided role
        });
        await existingUser.save();
      }

      // Generate JWT for authentication
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expires in 1 day
      });

      res.status(200).json({
        success: true,
        message: "Logged in successfully with Google",
        token,
        userType: existingUser.isFreelancer ? "user" : "org", // Based on role
      });

    } else {
      // Email/password login
      const { email, password, role } = req.body;
      const existingUser = await user.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({ message: "Invalid Email", success: false });
      }

      // Check if password matches (hashed password)
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        return res.status(400).send({ message: "Invalid Password", success: false });
      }
      // console.log((role==='user' && !existingUser.isFreelancer ))
      // console.log((role==='org' && !existingUser.isEmployee))
      if((role==='user' && !existingUser.isFreelancer ) || (role==='org' && !existingUser.isEmployee)){
        return res.status(400).send({ message: "Invalid Role", success: false });
      }

      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
        userType: existingUser.isFreelancer ? "user" : "org",
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", success: false });
  }
};

// Register Controller
const registerController = async (req, res) => {
  try {
    if (req.body.googleToken) {
      const googleToken = req.body.googleToken;

      console.log("Received Google token for registration:", googleToken);

      // Verify Google token
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log("Google Payload:", payload);
      if (!payload) {
        return res.status(400).send({ message: "Google Auth Failed", success: false });
      }

      // Check if user already exists
      const existingUser = await user.findOne({ email: payload.email });
      console.log("Existing User Check:", existingUser);

      if (existingUser) {
        return res.status(400).send({ message: "Email already in use", success: false });
      }

      // Create new user from Google OAuth data
      const newUser = new user({
        email: payload.email,
        name: payload.name,
        password: "", // Password field left empty for Google OAuth users
        authProvider: 'google',
        isFreelancer: req.body.role === "user",  // Set roles based on `req.body.role`
        isEmployee: req.body.role === "org",     // Set roles based on `req.body.role`
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expires in 1 day
      });

      res.status(201).json({
        success: true,
        message: "Registered successfully with Google",
        token,
        userType: newUser.isFreelancer ? "user" : "org", // Based on role
      });

    } else {
      // Email/password registration
      const { email, password, role } = req.body;

      const existingEmail = await user.findOne({ email });

      if (existingEmail) {
        return res.status(400).send({ message: "Email already in use", success: false });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Invalid email format", success: false });
      }

      if (!validator.isStrongPassword(password)) {
        return res.status(400).send({
          message:
            "Password must contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 symbol",
          success: false,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new user({
        email,
        password: hashedPassword,
        authProvider: 'email',
        name: req.body.name,
        isFreelancer: role === "user",  // Role based on request body
        isEmployee: role === "org",     // Role based on request body
      });

      await newUser.save();
      // console.log(newUser)
      if(newUser._id){
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: "1d", // Token expires in 1 day
        });
  
        res.status(201).json({
          success: true,
          message: "Signed up successfully",
          token,
          userType: newUser.isFreelancer ? "user" : "org", // Based on role
        });
      }
    }

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Auth Controller (for getting user info)
const authController = async (req, res) => {
  console.log(req.body)
  try {
    const users = await user.findById({ _id: req.body.userId });
    if (!users) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).send({
      success: true,
      data: {
        name: users.name,
        email: users.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth error",
      success: false,
      error,
    });
  }
};

export { loginController, registerController, authController };
