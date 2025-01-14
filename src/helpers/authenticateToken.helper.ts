import jwt from 'jsonwebtoken';
import { dev } from '../config/dev.configuration';



export interface JwtPayload {
    id: string;
    role: string;
  }
export const createToken = (payload:JwtPayload )=>{
    if (payload == null) {
        throw new Error("Payload is missing or null.");
      }
    
      if (typeof payload.id !== "string") {
        throw new Error("Invalid payload: 'id' must be a string.");
      }
    
      if (typeof payload.role !== "string") {
        throw new Error("Invalid payload: 'role' must be a string.");
      }
      var token = jwt.sign(payload,dev.JWT_SECRET,{expiresIn:"1h"})
      return token

}

export const verifyToken = (token:string)=>{
    try {
        if (typeof token !== "string" || token == null) {
            throw new Error("Invalid token");
          }
        const decode = jwt.verify(token,dev.JWT_SECRET)
        return decode
        
    } catch (error) {
        throw new Error('Token verification failed')
    }

}
