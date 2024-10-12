import { createError } from "../helpers/error.helper";
import { IRecipe, Recipe } from "../models/recipe.model";

export const createOne = async (recipe: Partial<IRecipe>) => {
  return await Recipe.create(recipe);
};

export const getById = async (id: string) => {
  const recipe = await Recipe.findOne({ _id: id })
    .populate("chef")
    .populate("category")
    .populate("media")
    .populate("ingredients")
    .populate("steps")
    .populate("comments");
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
    .populate("chef")
    .populate("category")
    .populate("media")
    .populate("ingredients")
    .populate("steps")
    .populate("comments");
};

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
