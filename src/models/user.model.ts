import { Schema, model, Document } from "mongoose";
import { IRecipe } from "./recipe.model";
import { IFavorite } from "./favorite.model";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
  bio: string;
  profileImage: string;
  recipes: IRecipe["_id"][];
  favorite: IFavorite["_id"][];

}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [
      {
        validator: async function (value: string): Promise<boolean> {
          const user = await User.findOne({ email: value });
          return !user;
        },
        message: "Email already exists",
      },
      {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // minlength: [8, "Password must be at least 8 characters"],
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.USER, 
    required: true
  },
  bio: {
    type: String,
    default: "A brief bio will appear here once added."
  },
  profileImage: {
    type: String,
    default: "dhttps://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  favorite: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }]


})

export const User = model<IUser>("User", UserSchema);
