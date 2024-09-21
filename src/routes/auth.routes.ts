import { Router } from "express";
import { login, logOut } from "../controllers/auth.controller";
import { isLoggedIn, isLoggedOut } from "../middleware/auth.middleware";




export const AuthRouter = Router()

// POST /auth/login
AuthRouter.post("/login",isLoggedOut, login)

// POST /auth/logout
AuthRouter.post("/logout",isLoggedIn,logOut)