import { ICategory, Category } from "../models/category.model";

export const createOne = async (category: ICategory) => {
  var { name } = category;
  console.log("name\n", name);
  console.log("category\n", category);

  return Category.create(category);
};

export const getById = (id: string) => {
  return Category.findById(id).exec();
};

export const getAll = () => {
  return Category.find().exec();
};

export const updateOneById = (id: string, category: Partial<ICategory>) => {
  return Category.findByIdAndUpdate(id, category, { new: true }).exec();
};

export const deleteOneById = (id: string) => {
  return Category.findByIdAndDelete(id).exec();
};

``;
