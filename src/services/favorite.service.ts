import { createError } from "../helpers/error.helper";
import { IFavorite, Favorite } from "../models/favorite.model";

export const createOne = async (favorite: Partial<IFavorite>) => {
  return await Favorite.create(favorite);
};

export const getById = async (id: string) => {
  const favorite = await Favorite.findOne({ _id: id });
  if (!favorite) {
    throw createError(400, "Favorite Recipe not found. ");
  }
  return favorite;
};

export const getAll = async () => {
  return await Favorite.find();
};

export const updateOneById = async (
  id: string,
  favorite: Partial<IFavorite>
) => {
  const updatedFavorite = await Favorite.findOneAndUpdate(
    { _id: id },
    favorite,
    { new: true }
  );
  if (!updatedFavorite) {
    throw createError(400, "Favorite Recipe not found. ");
  }
  return updatedFavorite;
};

export const deleteOneById = async (id: string) => {
  const deletedFavorite = await Favorite.findOneAndDelete({ _id: id });
  if (!deletedFavorite) {
    throw createError(400, "Favorite Recipe not found. ");
  }
  return deletedFavorite;
};
