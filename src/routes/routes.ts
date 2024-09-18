import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API!' });
});

router.post('/api/data', (req: Request, res: Response) => {
  const data = req.body;
  res.json({ received: data });
});

export default router;
