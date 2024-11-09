import path from "path";
import { createError } from "../helpers/error.helper";
import { IRecipe, Recipe } from "../models/recipe.model";

export const createOne = async (recipe: Partial<IRecipe>) => {
  return await Recipe.create(recipe);
};

export const getById = async (id: string) => {
  const recipe = await Recipe.findOne({ _id: id })
    .populate("category")
    .populate("media")
    .populate("ingredients")
    .populate("steps")
    .populate({
      path: "chef",
      populate:{
        path:"following",
        select:"username"
      }
    })
    .populate({
      path: "comments",
      select: " -__v",
      populate:{
        path:"user",
        select:"username _id profileImage"
      }
    });
  if (!recipe) {
    throw createError(400, " Recipe not found. ");
  }
  return recipe;
};

export const getByTitle = async (title: string) => {
  const recipe = await Recipe.findOne({ title: title })
  if (recipe) {
    throw createError(400, `Recipe with ${title} Already exist`);
  }
  return true;
};

export const getAll = async () => {
  return await Recipe.find()
    .populate("category")
    .populate("media")
    .populate("ingredients")
    .populate("steps")
    .populate({
      path: "chef",
      populate:{
        path:"following",
        select:"username"
      }
    })   
     .populate({
      path: "comments",
      select: " -__v",
      populate:{
        path:"user",
        select:"username _id profileImage"
      }
    });};

export const updateOneById = async (id: string, recipe: Partial<IRecipe>) => {
  const updatedRecipe = await Recipe.findOneAndUpdate({ _id: id }, recipe, {
    new: true,
  });
  if (!updatedRecipe) {
    throw createError(400, "Recipe not found. ");
  }
  return updatedRecipe;
};

export const deleteOneById = async (id: string) => {
  const deletedRecipe = await Recipe.findOneAndDelete({ _id: id });
  if (!deletedRecipe) {
    throw createError(400, "Recipe not found. ");
  }
  return deletedRecipe;
};
export const addComment = async (id: string, comment:string) => {
  var updatedUser = await Recipe.findOneAndUpdate({ _id: id },{ $push: { comments: comment } });
  if (!updatedUser) {
    throw createError(400, "User not found. ");
  }
  return updatedUser;
};
export const removeComment = async (id: string, comment:string) => {
  var updatedUser = await Recipe.findOneAndUpdate({ _id: id },{ $pull: { comments: comment } });
  if (!updatedUser) {
    throw createError(400, "Comment not found. ");
  }
  return updatedUser;
};
