import { Router } from "express";
import { login, logOut } from "../controllers/auth.controller";
import { isLoggedIn, isLoggedOut } from "../middleware/auth.middleware";




export const AuthRouter = Router()


AuthRouter.post("/login",isLoggedOut, login)

AuthRouter.post("/logout",isLoggedIn,logOut)