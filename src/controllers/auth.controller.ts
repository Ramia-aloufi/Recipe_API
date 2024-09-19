import { Request, Response } from "express";
import { createUser } from "../repositories/user.repository";
import { createToken } from "../helpers/authenticateToken.helper";
import { dev } from "../config/dev.configuration";
import { Login } from "../types/auth.type";
import { loginUser } from "../repositories/auth.repository";



export const login = async (req:Request,res:Response) =>{
    try{
        const {email,password} = req.body

        const user:Login = {
            email,
            password
        } 
        console.log(user);
        
        const newUser = await loginUser(user)
        const payload = {
            id:newUser.id,
            role:newUser.role
        }

        const token = createToken(payload)
        res.cookie(dev.AUTH_TOKEN,token)
        res.status(201).json({})


    }catch(error){
        res.status(500).json({error:error})
    }




}

export const logOut = async(req:Request,res:Response)=>{
    try{
        res.clearCookie(dev.AUTH_TOKEN)
        res.status(200).json({})

    }catch(error){
        res.status(400).json({})

    }

}