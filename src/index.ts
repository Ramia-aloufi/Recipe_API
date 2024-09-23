import express, { NextFunction, Request, Response } from 'express'
import { categoryRouter } from './routes/category.routes'
import { commentRouter } from './routes/comment.routes'
import { favoriteRouter } from './routes/favorite.routes'
import { recipeRouter } from './routes/recipe.routes'
import { userRouter } from './routes/user.routes'
import { connectDB } from './config/db.configuration'
import { AuthRouter } from './routes/auth.routes'
import cookieParser from 'cookie-parser'
import { createError, CustomError } from './helpers/error.helper'
import { errorResponse } from './helpers/apiResponse.helper'
import cors from 'cors'


const app = express();

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/auth",AuthRouter)
app.use('/users', userRouter)
app.use('/recipes', recipeRouter)
app.use('/categories', categoryRouter)
app.use('/comments', commentRouter)
app.use('/favorites', favoriteRouter)

connectDB()


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.use((err:CustomError, req:Request, res:Response, next:NextFunction) => {
errorResponse(res,{message:err.message || err.messages || "internal server error",statusCode:err.statusCode || 500})
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
})

app.use(( req:Request, res:Response, next:NextFunction)=>{
  next (errorResponse(res,{message: "route not found",statusCode:404})
)
})

export default app


