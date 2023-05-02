class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof this.CustomError) {
    return res.status(err.statusCode).send({ err: err.message });
  }

  return res.status(500).send({ err: 'An internal server error occured' });
};

const notFound = (req, res, next) => {
  res.status(404).send({ err: 'Resource not found' });
};

module.exports = {
  CustomError,
  errorHandler,
  notFound,
};
