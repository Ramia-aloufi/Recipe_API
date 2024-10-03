import { ObjectId } from "mongoose";
import { createError } from "../helpers/error.helper";
import { IUser, User } from "../models/user.model";

export const createUser = async (user: IUser) => {
  return await User.create(user);
};

export const getUserById = async (id: string | undefined) => {
  var user = await User.findOne({ _id: id });
  if (!user) {
    throw createError(400, "User not found. ");
  }
  return user;
};


export const getUserByEmail = async (email: string) => {
  var user = await User.findOne({ email: email });
  if (!user) {
    throw createError(400, "User not found. ");
  }
  return user;
};

export const getAllUsers = async () => {
  return await User.find().exec();
};

export const updateUserById = async (id: string, user: Partial<IUser>) => {
  var updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
    new: true,
  });
  if (!updatedUser) {
    throw createError(400, "User not found. ");
  }
  return updatedUser;
};

export const deleteUserById = async (id: string) => {
  var deletedUser = await User.findOneAndDelete({ _id: id });
  if (!deletedUser) {
    throw createError(400, "User not found. ");
  }
  return deletedUser;
};
