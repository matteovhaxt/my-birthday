const express = require('express');
const router = express.Router();
const db = require('../../../data/database.js');

router.get('/', (req, res) => {
  console.log('Fetching invites');

  db.all(`SELECT * FROM invites`, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.post('/', (req, res) => {
  console.log('Creating invite', req.body);

  if (!req.body.name || !req.body.email || !req.body.phone) {
    return res.status(400).json({ error: 'Missing required fields' });
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

module.exports = router;