const router = require('express').Router();
const {
  getUsers, getUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
// router.post('/', createUser);
router.get('/me', getCurrentUser);
router.get('/:id', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
