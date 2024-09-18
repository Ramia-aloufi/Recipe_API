import { IComment, Comment } from "../models/comment.model";

export const createOne = async (comment: IComment) => {
  return await Comment.create(comment);
};

export const getById = async (id: string) => {
  return await Comment.findById(id).exec();
};

export const getAll = async () => {
  return await Comment.find().exec();
};

export const updateOneById = async (id: string, comment: Partial<IComment>) => {
  return await Comment.findByIdAndUpdate(id, comment, { new: true }).exec();
};

export const deleteOneById = async (id: string) => {
  return await Comment.findByIdAndDelete(id).exec();
};
