import { createError } from "../helpers/error.helper";
import { IFavorite, Favorite } from "../models/favorite.model";

export const createOne = async (favorite: Partial<IFavorite>) => {
  return await Favorite.create(favorite);
};


export const deleteOneById = async (id: string) => {
  const deletedFavorite = await Favorite.findOneAndDelete({ _id: id });
  if (!deletedFavorite) {
    throw createError(400, "Favorite Recipe not found. ");
  }
  return deletedFavorite;
};
