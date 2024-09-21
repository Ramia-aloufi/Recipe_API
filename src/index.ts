import express, { NextFunction, Request, Response } from 'express'
import { categoryRouter } from './routes/category.routes'
import { commentRouter } from './routes/comment.routes'
import { favoriteRouter } from './routes/favorite.routes'
import { recipeRouter } from './routes/recipe.routes'
import { userRouter } from './routes/user.routes'
import { connectDB } from './config/db.configuration'
import { AuthRouter } from './routes/auth.routes'
import cookieParser from 'cookie-parser'
import { CustomError } from './helpers/error.helper'
import { errorResponse } from './helpers/apiResponse.helper'


const app = express();

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

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


