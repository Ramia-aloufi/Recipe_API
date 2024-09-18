import { IRecipe, Recipe } from "../models/recipe.model";

export const createRecipe = async(recipe: IRecipe) => {
  return await Recipe.create(recipe);
};

export const getById = async (id: string) => {
  return await Recipe.findById(id)
    .populate("chef")
    .populate("category")
    .populate("media")
    .populate("ingredients")
    .populate("steps")
    .populate("comments")
    .exec();
};

export const getAll = async () => {
  return await Recipe.find()
    .populate("chef")
    .populate("category")
    .populate("media")
    .populate("ingredients")
    .populate("steps")
    .populate("comments")
    .exec();
};

export const updateOneById = async (id: string, recipe: Partial<IRecipe>) => {
  return await Recipe.findByIdAndUpdate(id, recipe, { new: true }).exec();
};

export const deleteOneById = async (id: string) => {
  return await Recipe.findByIdAndDelete(id).exec();
};
