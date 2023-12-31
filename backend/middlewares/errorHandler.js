const errorHandler = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? err.message : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
