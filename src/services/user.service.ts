import { ObjectId } from "mongoose";
import { createError } from "../helpers/error.helper";
import { IUser, User } from "../models/user.model";

export const createUser = async (user: IUser) => {
  return await User.create(user);
};

export const getUserById = async (id: string | undefined) => {
  var user = await User.findOne({ _id: id }).populate("recipes")
  .populate("favorite").select("-password -role -_id -__v -email").exec();
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
  var user = await User.findOne({ username: username }).populate("recipes")
  .populate("favorite").populate("following")
  .select("-password -role -_id -__v -email").exec();
    
  if (!user) {
    throw createError(400, "User");
  }
  return user;
};

export const getAllUsers = async (currentPage:number,pageSize:number) => {
  return await User.find().populate("recipes")
  .populate("favorite").skip((currentPage - 1) * pageSize)
  .limit(pageSize)}

export const updateUserById = async (id: string, user: Partial<IUser>) => {
  const updateData: any = { ...user };
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw createError(400, "User not found.");
  }

  if (user.recipes) {
    updateData.$push = { recipes:  user.recipes  };
    delete updateData.recipes;
  }

  if (user.favorite) {
      if (existingUser.favorite.includes(user.favorite)) {
        updateData.$pull = { favorite: user.favorite };
      } else {
        updateData.$addToSet = { favorite: user.favorite };
      }
    delete updateData.favorite;
  }
  const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  }).populate("recipes")
  .populate("favorite").populate("following")
  .select("-password -role -_id -__v -email").exec();;

  if (!updatedUser) {
    throw createError(400, "User not found.");
  }

  return updatedUser;
};

// export const addFavorite = async (id: string, favorite:string) => {
//   var updatedUser = await User.findOneAndUpdate({ _id: id },{ $push: { favorite: favorite } });
//   if (!updatedUser) {
//     throw createError(400, "User not found. ");
//   }
//   return updatedUser;
// };
// export const removeFavorite = async (id: string, favorite:string) => {
//   var updatedUser = await User.findOneAndUpdate({ _id: id },{ $pull: { favorite: favorite } });
//   if (!updatedUser) {
//     throw createError(400, "User not found. ");
//   }
//   return updatedUser;
// };

export const deleteUserById = async (id: string) => {
  var deletedUser = await User.findOneAndDelete({ _id: id });
  if (!deletedUser) {
    throw createError(400, "User not found. ");
  }
  return deletedUser;
};
export const followUser = async (name: string, id: string) => {
  const existingUser = await User.findOne({ username: name });
  if (!existingUser) {
    throw createError(400, "User not found.");
  }

  const updateData = existingUser.favorite.includes(id)
    ? { $pull: { favorite: id } }
    : { $addToSet: { favorite: id } };

  const updatedUser = await User.findOneAndUpdate({ username: name }, updateData, {
    new: true,
  }).populate("recipes")
  .populate("favorite").populate("following")
  .select("-password -role -_id -__v -email").exec();;

  if (!updatedUser) {
    throw createError(400, "User not found.");
  }

  return updatedUser;
};

// export const unFollowUser = async(name:string,id:string,)=>{
//   var user = await User.findOneAndUpdate({ username: name },{ $pull: { following: id } },{new:true}).populate("recipes")
//   .populate("favorite").populate("following")
//   .select("-password -role -_id -__v -email").exec();

//   if (!user) {
//     throw createError(400, "User not found. ");
//   }
//   return user;
// }

export const getUserTotal = async() => {
  return (await User.find()).length
}
