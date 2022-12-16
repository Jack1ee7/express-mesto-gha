class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

const serverError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = { ServerError, serverError };
