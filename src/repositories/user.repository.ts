import { IUser, User } from "../models/user.model";

export const createUser = async (user: IUser) => {
  return await User.create(user);
};

export const getUserById = async (id: string) => {
  return await User.findById(id).exec();
};

export const getUserByEmail = async (email: string) => {
    return await User.findOne({email:email});
  };

export const getAllUsers = async() => {
  return await User.find().exec();
};

export const updateUserById = async(id: string, user: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, user, { new: true }).exec();
};

export const deleteUserById = async(id: string) => {
  return await User.findByIdAndDelete(id).exec();
};
