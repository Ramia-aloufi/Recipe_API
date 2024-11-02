import { ObjectId } from "mongoose";
import { createError } from "../helpers/error.helper";
import { IUser, User } from "../models/user.model";

export const createUser = async (user: IUser) => {
  return await User.create(user);
};

export const getUserById = async (id: string | undefined) => {
  var user = await User.findOne({ _id: id }).populate("recipes")
  .populate({
    path: "favorite",
    select: "-user -__v",
    populate:"recipe"
  }).select("-password -role -_id -__v -email").exec();
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

export const getOneByName = async (username: string) => {
  var user = await User.findOne({ username: username }).populate({
    path: "favorite",
    select: "-user -__v",
    populate:"recipe"
  }).select("-password -role -_id -__v -email").exec();;
  if (!user) {
    throw createError(400, "User not found. ");
  }
  return user;
};

export const getAllUsers = async () => {
  return await User.find().populate("recipes")
  .populate("favorite").exec();
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

export const addFavorite = async (id: string, favorite:string) => {
  var updatedUser = await User.findOneAndUpdate({ _id: id },{ $push: { favorite: favorite } });
  if (!updatedUser) {
    throw createError(400, "User not found. ");
  }
  return updatedUser;
};
export const removeFavorite = async (id: string, favorite:string) => {
  var updatedUser = await User.findOneAndUpdate({ _id: id },{ $pull: { favorite: favorite } });
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
