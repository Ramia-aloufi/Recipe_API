import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';
import { IRecipe } from './recipe.model';

export interface IComment extends Document {
    user: IUser['id'];
    recipe: IRecipe['id'];
    commentText: string;
}

const CommentSchema = new Schema<IComment>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    commentText: { type: String, required: true },
});

export const Comment = model<IComment>('Comment', CommentSchema);
