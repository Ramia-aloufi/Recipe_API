import { User } from "../models/user.model";
import { comparePassword } from "../services/auth.service";
import { Login } from "../types/auth.type";
import bcrypt from "bcrypt";





export const loginUser = async(data:Login)=>{
        const {email ,password} = data

        if (!email || !password) {
            throw new Error( 'Email and password are required.' )
          }
        const isExist = await User.findOne({email:email})

        if(!isExist){
            throw new Error("User not found. Check the email and try again.");
        }
        console.log(isExist);
        
        const matchedPassword = await bcrypt.compare(password, isExist.password)

        console.log("matchedPassword\n",matchedPassword);
        

        if(!matchedPassword){
            throw new Error("Invalid credentials");
        }
        return isExist

}