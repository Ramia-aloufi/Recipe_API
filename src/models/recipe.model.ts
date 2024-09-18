import { Schema, model, Document } from 'mongoose';
import { ICategory } from './category.model';
import { IComment } from './comment.model';
import { IUser } from './user.model';
export interface IMedia extends Document {
    recipe: IRecipe;
    mediaType: MediaType;
    mediaUrl: string;
    order: number;
}
export enum MediaType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
}
export enum Unit {
    G = 'G',
    KG = 'KG',
    ML = 'ML',
    L = 'L',
    CUP = 'CUP',
    TBSP = 'TBSP',
    TSP = 'TSP'
}

export interface IRecipeIngredient extends Document {
    ingredient: IIngredient;
    quantity: number;
    unit: Unit;
}
export interface IStep extends Document {
    stepNumber: number;
    instruction: string;
}

export interface IIngredient extends Document {
    name: string;
}

export interface IRecipe extends Document {
    title: string;
    preparationTime: number;
    cookingTime: number;
    servings: number;
    chef: IUser['_id'];
    category: ICategory["id"];
    media: IMedia[];
    ingredients: IRecipeIngredient[];
    steps: IStep[];
    comments: IComment["_id"][];
}

const RecipeSchema = new Schema<IRecipe>({
    title: { type: String, required: true },
    preparationTime: { type: Number, required: true },
    cookingTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    chef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    media: [
        {
          mediaType: { type: String, required: true },
          mediaUrl: { type: String, required: true },
          order: { type: Number, required: true },
        }
      ],
      ingredients: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          unit: { type: String, required: true },
        }
      ],
      steps: [
        {
          stepNumber: { type: Number, required: true },
          instruction: { type: String, required: true },
        }
      ],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

export const Recipe = model<IRecipe>('Recipe', RecipeSchema);
