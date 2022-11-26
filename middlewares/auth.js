const jwt = require('jsonwebtoken');

const { AUTH_ERROR } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res
    .status(AUTH_ERROR.code)
    .send({ message: AUTH_ERROR.message });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
