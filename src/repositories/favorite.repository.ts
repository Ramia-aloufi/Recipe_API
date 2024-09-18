import { IFavorite, Favorite } from "../models/favorite.model";

export const createOne = async (favorite: IFavorite) => {
  return await Favorite.create(favorite);
};

export const getById = async (id: string) => {
  return await Favorite.findById(id).exec();
};

export const getAll = async () => {
  return await Favorite.find().exec();
};

export const updateOneById = async (
  id: string,
  favorite: Partial<IFavorite>
) => {
  return await Favorite.findByIdAndUpdate(id, favorite, { new: true }).exec();
};

export const deleteOneById = async (id: string) => {
  return await Favorite.findByIdAndDelete(id).exec();
};
