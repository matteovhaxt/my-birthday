import express, { Request, Response, NextFunction } from 'express';
import { router as inviteRoutes } from './routes/invite/index.js';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/invites', inviteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});