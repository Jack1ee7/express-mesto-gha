const router = require('express').Router();
const NotFoundError = require('../utils/errors/NotFoundError');

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

module.exports = router;
