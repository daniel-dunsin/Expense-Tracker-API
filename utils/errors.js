class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorFormatter = (error) => {
  if (error.code === 11000) {
    // For mongoose duplicate error
    const errors = [];

    Object.entries(error.keyValue).forEach((err) => {
      errors.push(`A user with this ${err[0]} exists`);
    });

    return errors.join(', ');
  } else {
    return undefined;
  }
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ err: err.message });
  }

  const message = errorFormatter(err);

  return res
    .status(500)
    .send({ err: message || 'An internal server error occured' });
};

const notFound = (req, res, next) => {
  res.status(404).send({ err: 'Resource not found' });
};

module.exports = {
  CustomError,
  errorHandler,
  notFound,
};
