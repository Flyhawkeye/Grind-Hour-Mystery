const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const usersRoute = require('./routes/users');

app.use(express.json());
app.use('/api', usersRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});