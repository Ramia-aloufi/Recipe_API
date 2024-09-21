import { createError } from "../helpers/error.helper";
import { IComment, Comment } from "../models/comment.model";

export const createOne = async (comment: IComment) => {
  return await Comment.create(comment);
};

export const getById = async (id: string) => {
  const recipe = await Comment.findOne({_id:id});
  if (!recipe) {
    throw createError(400, "Comment not found. ");
  }
  return recipe;
};

export const getAll = async () => {
  return await Comment.find()
};

export const updateOneById = async (id: string, comment: Partial<IComment>) => {
  var updatedComment = await Comment.findOneAndUpdate({ _id: id }, comment, {
    new: true,
  });
  if (!updatedComment) {
    throw createError(400, "Comment not found. ");
  }
  return updatedComment;
};

export const deleteOneById = async (id: string) => {
  var deletedComment = await Comment.findOneAndDelete({ _id: id });
  if (!deletedComment) {
    throw createError(400, "Comment not found. ");
  }
  return deletedComment;
};
