import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../models/user.js";
import validator from "validator";

const loginController = async (req, res) => {
  try {
    // Find user by username
    const existingUser = await user.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(400)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Invalid username or Password", success: false });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const registerController = async (req, res) => {
  try {
    const exisitingUser = await user.findOne({ username: req.body.username });
    if (exisitingUser) {
      return res
        .status(400)
        .send({ message: "Username Already Exist", success: false });
    }
    if (!validator.isEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: "Invalid email format", success: false });
    }

    if (!validator.isStrongPassword(req.body.password)) {
      return res.status(400).send({
        message:
          "Password must contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 symbol",
        success: false,
      });
    }
    const existingEmail = await user.findOne({ email: req.body.email });
    if (existingEmail) {
      return res
        .status(400)
        .send({ message: "Email already in use", success: false });
    }
    // Hash the password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const role = req.body.role;
    req.body.isFreelancer = role === "user";
    req.body.isEmployee = role === "org";
    // Create a new user instance
    const newUser = new user(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Signed up successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const authController = async (req, res) => {
  try {
    const users = await user.findById({ _id: req.body.userId });
    users.password = undefined;
    if (!users) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: users,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

export { loginController, registerController, authController };
