const rateLimit = require('express-rate-limit');

const REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)$/;

const CORS = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://mesto.jack1ee7.nomoredomains.club',
    'http://mesto.jack1ee7.nomoredomains.club',
    'https://jack1ee7.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { REGEX, CORS, limiter };
