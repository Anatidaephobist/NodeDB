require('dotenv').config();
const sqlite3 = require('sqlite3');
const errorHandler = require('../errorhandler/errorHandler');

const db = new sqlite3.Database(`./db/${process.env.DATABASE}`, (error) => {
  if (error) errorHandler(error);
  console.log("Database connected");
});

module.exports = db;