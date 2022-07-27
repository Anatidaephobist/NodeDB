require('dotenv').config();
const express = require('express');
const booksRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/books', booksRoutes);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
})