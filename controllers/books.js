const errorHandler = require('../errorhandler/errorHandler');
const db = require('../db/database');
const httpStatusCodes = require('../errorhandler/httpStatusCodes');


const bookListing = (req, res) => {
  db.all("SELECT * FROM books", [], (error, data) => {
    if (error) errorHandler(error);
    res.send(data);
  });
}

const validateData = (req) => {
  if (req.body.title == "" || !req.body.title) return false;
  if (req.body.author == "" || !req.body.author) return false;
  if (isNaN(req.body.year) || !req.body.year) return false;
  if (req.body.publisher == "" || !req.body.publisher) return false;
  return true;
}

const singleBook = (req, res) => {
  db.get(`SELECT * FROM books WHERE id == ${req.params.id}`, [], (error, data) => {
    if (error) errorHandler(error);
    res.send(data);
  });
}

const newBook = (req, res) => {
  let validData = validateData(req);
  if (validData) {
    db.all(`SELECT * FROM books WHERE title='${req.body.title}' AND author='${req.body.author}' AND year=${req.body.year}`, [], (error, data) => {
      if (error) errorHandler(error);
      if (data.length > 1) {
        res.status(httpStatusCodes.BAD_REQUEST).end();
        return;
      }
      db.run(`INSERT INTO books(title, author, year, publisher, description) VALUES(?,?,?,?,?)`,
        [`${req.body.title}`, `${req.body.author}`, `${req.body.year}`, `${req.body.publisher}`, `${req.body.description}`], (error, data) => {
          if (error) errorHandler(error);
          db.get("SELECT last_insert_rowid() as id", [], (error, data) => {
            if (error) errorHandler(error);
            res.send(data).status(httpStatusCodes.OK).end();
            return;
          });
        });
    });
  } else {
    res.status(400).end();
  }
}

const deleteBook = (req, res) => {
  db.run(`DELETE FROM books WHERE id=${req.params.id}`, [], (error, data) => {
    if (error) errorHandler(error);
    res.status(httpStatusCodes.NO_CONTENT).send('No Content');
  });
  ;
}

module.exports = {
  bookListing: bookListing,
  singleBook: singleBook,
  newBook: newBook,
  deleteBook: deleteBook
}