const errorHandler = (error) => {
  const err = new Error(error.message);
  console.log(err.stack);
  process.exit(1);
}

module.exports = errorHandler;