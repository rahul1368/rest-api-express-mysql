const router = require('express').Router();
const {
  getUsersController,
  createUserController,
  deleteUserController,
  loginController,
} = require('./user.controller');
const { authorization } = require('../../middlewares/authMiddleware');
router.get('/', authorization, getUsersController);
router.post('/create-user', createUserController);
router.delete('/remove-user', deleteUserController);
router.post('/login-user', loginController);

module.exports = router;
