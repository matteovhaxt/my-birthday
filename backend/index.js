const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const inviteRoutes = require('./routes/invite');
app.use('/invites', inviteRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} 