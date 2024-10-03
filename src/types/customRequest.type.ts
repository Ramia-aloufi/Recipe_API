import { Request } from "express";
import { ObjectId } from "mongoose";

export interface CustomRequest extends Request {
    id?: string,
    role?:string
  }



