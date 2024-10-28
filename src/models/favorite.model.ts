import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';
import { IRecipe } from './recipe.model';

export interface IFavorite extends Document {
    user: IUser["_id"];
    recipe: IRecipe["_id"];
}

const FavoriteSchema = new Schema<IFavorite>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true }
});

export const Favorite = model<IFavorite>('Favorite', FavoriteSchema);
