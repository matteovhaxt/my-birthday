import { db } from '../../data/database.js';
import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  console.log('Fetching invites');

  db.all(`SELECT * FROM invites`, (err: any, rows: any) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  console.log('Creating invite', req.body);

  if (!req.body.name || !req.body.email || !req.body.phone) {
    res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(`INSERT INTO invites (name, email, phone) VALUES (?, ?, ?)`, [req.body.name, req.body.email, req.body.phone], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Invite sent' });
    }
  });
});
