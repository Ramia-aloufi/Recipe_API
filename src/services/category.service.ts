import { createError } from "../helpers/error.helper";
import { ICategory, Category } from "../models/category.model";

export const createOne = async (category: ICategory) => {
  var { name } = category;
  if (!name) {
    throw createError(400, "name required");
  }
  var isExist = await Category.findOne({ name });
  if (isExist) {
    throw createError(400, "name isExist");
  }
  var newCategory = new Category({
    name,
  });
  newCategory.save();
  return newCategory;
};

export const getById = async (id: string) => {
  var category = await Category.findOne({ _id: id });
  if (!category) {
    throw createError(400, "Category not found. ");
  }
  return category;
};

export const getAll = async (currentPage:number,pageSize:number) => {
  return await Category.find()    
  .skip((currentPage - 1) * pageSize)
  .limit(pageSize)};;

export const updateOneById = async (
  id: string,
  category: Partial<ICategory>
) => {
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: id },
    category,
    { new: true }
  );
  if (!updatedCategory) {
    throw createError(400, "Category not found. ");
  }
  return updatedCategory;
};

export const deleteOneById = async (id: string) => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    throw createError(400, "Category not found. ");
  }
  return deletedCategory;
};
export const getCategoryTotal = async() => {
  return (await Category.find()).length
}
