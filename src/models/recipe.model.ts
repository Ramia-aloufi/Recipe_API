import { Schema, model, Document } from "mongoose";
import { ICategory } from "./category.model";
import { IComment } from "./comment.model";
import { IUser } from "./user.model";

export interface IRecipe extends Document {
  title: string;
  description: string;
  preparationTime: number;
  cookingTime: number;
  servings: number;
  chef: IUser["_id"];
  category: ICategory["id"];
  media: String[];
  ingredients: String[];
  steps: String[];
  comments: IComment["_id"][];
}

const RecipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  cookingTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  chef: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  media: [{ type: String, required: true }],
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export const Recipe = model<IRecipe>("Recipe", RecipeSchema);
