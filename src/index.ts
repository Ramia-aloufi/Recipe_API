import express, { Request, Response } from 'express';
import routes from './routes/routes';
import { categoryRouter } from './routes/category.routes';
import { commentRouter } from './routes/comment.routes';
import { favoriteRouter } from './routes/favorite.routes';
import { recipeRouter } from './routes/recipe.routes';
import { userRouter } from './routes/user.routes';
import { connectDB } from './config/db.configuration';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRouter);
app.use('/recipes', recipeRouter);
app.use('/categories', categoryRouter);
app.use('/comments', commentRouter);
app.use('/favorites', favoriteRouter);

connectDB()


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
