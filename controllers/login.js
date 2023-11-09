import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { formatUser } from "../utilities/formattedUser.js";

export const loginController = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      res.json({ err: "email not valid" });
      return;
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    console.log(passwordCheck);
    if (!passwordCheck) {
      res.json({ err: "password not valid" });
      return;
    }
    const formattedUser = formatUser(user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token: token, user: formattedUser });
  } catch (error) {
    res.json({ err: error.message });
  }
};
