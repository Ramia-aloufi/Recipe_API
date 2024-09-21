import { createError } from "../helpers/error.helper";
import { User } from "../models/user.model";
import { Login } from "../types/auth.type";
import bcrypt from "bcrypt";

export const loginUser = async (data: Login) => {
  const { email, password } = data;
  if (!email || !password) {
    throw createError(400, "Email and password are required.");
  }
  const isExist = await User.findOne({ email: email });
  if (!isExist) {
    throw createError(400, "User not found. Check the email and try again.");
  }
  const matchedPassword = await bcrypt.compare(password, isExist.password);
  if (!matchedPassword) {
    throw createError(400, "Invalid credentials");
  }
  return isExist;
};
