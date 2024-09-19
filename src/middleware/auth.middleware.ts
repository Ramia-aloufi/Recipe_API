import { NextFunction,Request,Response } from "express";
import { JwtPayload, verifyToken } from "../helpers/authenticateToken.helper";
import { dev } from "../config/dev.configuration";
import { CustomRequest } from "../types/customRequest.type";




export const isAdmin = (req:CustomRequest,res:Response,next:NextFunction) => {
  const user_role= req.role
  if(user_role?.toLowerCase() != "admin"){
    throw new Error("Access restricted. Admins only.");
  }
    return next()
  
}

export const isLoggedIn = (req:CustomRequest,res:Response,next:NextFunction)=>{
  try{
  const token = req.cookies[dev.AUTH_TOKEN];
  if(!token){
    throw new Error("Access denied. Please log in.");

  }
    const verifiedToken = verifyToken(token) as JwtPayload

    if(!verifiedToken){
      throw new Error("Something went wrong. Please log in again.");
    }
      req.id = verifiedToken.id
      req.role = verifiedToken.role
      return next()
  }catch(error){
    return next(error)
  }
    

  }

export const isLoggedOut = (req:Request,res:Response,next:NextFunction)=>{
  try{
    const token = req.cookies[dev.AUTH_TOKEN];
    if(token){
      throw new Error("You're already logged in.");  
    }
    return next()
}catch(error){
return next(error)
}
}
  