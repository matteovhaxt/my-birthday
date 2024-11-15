import { Router, Request, Response } from 'express';
import { db } from '../../data/index.js';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  console.log('Fetching invites');

  db.invites.findMany().then((invites) => {
    res.json(invites);
  }).catch((err) => {
    console.error(err);
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  console.log('Creating invite', req.body);

  if (!req.body.name || !req.body.email || !req.body.phone) {
    console.log('Missing required fields');
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  db.invites.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }
  }).then(() => {
    res.json({ message: 'Invite sent' });
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ error: err.message });
  });
});
