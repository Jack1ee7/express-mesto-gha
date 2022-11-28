const router = require('express').Router();
const {
  getUsers, getUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');
const { updateAvatarRule, updateProfileRule, getUserRule } = require('../utils/validationRules');

router.get('/', getUsers);
router.get('/me', getUserRule, getCurrentUser);
router.get('/:id', getUserRule, getUser);
router.patch('/me', updateProfileRule, updateProfile);
router.patch('/me/avatar', updateAvatarRule, updateAvatar);

module.exports = router;
