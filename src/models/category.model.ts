import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String,
        required: [true, 'Name is required'], 
        minlength: [3, 'Name must be at least 3 characters'],  
        maxlength: [50, 'Name must be less than 50 characters']          }
});

export const Category = model<ICategory>('Category', CategorySchema);
