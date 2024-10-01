import { NextFunction, Request, Response } from "express";
import { createToken } from "../helpers/authenticateToken.helper";
import { dev } from "../config/dev.configuration";
import { Login } from "../types/auth.type";
import { loginUser } from "../services/auth.service";
import { successResponse } from "../helpers/apiResponse.helper";

export const login = async (
  req: Request,
  res: Response,
next:NextFunction) => {
  try {
    const { email, password } = req.body

    const user: Login = {
      email,
      password,
    }

    const newUser = await loginUser(user);
    const payload = {
      id: newUser.id,
      role: newUser.role,
    }
    const token = createToken(payload)
    res.cookie(dev.AUTH_TOKEN, token,{
      maxAge: 60 * 60 * 1000, 
      httpOnly: true,
      sameSite:'lax',
      secure:true
    })    
    successResponse<string>(res,{
        message:"User login successfully.",
        statusCode:201,
        data:token
    })  
  } catch (error) {
    console.log(error);
    
    next(error)
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie(dev.AUTH_TOKEN);
    successResponse<null>(res,{
        message:"User logout successfully.",
        statusCode:201,
        data:null
    })  
  } catch (error) {
    
     next(error);
  }
}