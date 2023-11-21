import bcrypt from "bcrypt";
import User from "../models/user.js";
import { formatUser } from "../utilities/formattedUser.js";

export const registerController = async function (req, res) {
  try {
    const { firstName, lastName, email, password, location, occupation } =
      req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    const formattedUser = savedUser.firstName;
    console.log(passwordHash, location);
    res.status(201).json(formattedUser);
  } catch (error) {
    if (error.keyPattern?.email === 1) {
      res.status(400).json({ error: " email already used" });
    } else {
      console.log("error on registerController", error);
      res.status(500).json({ error: error.message });
    }
  }
};
