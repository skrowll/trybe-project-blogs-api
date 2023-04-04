const { Router } = require('express');
const userController = require('../controllers/user.controller');
const authToken = require('../middlewares/authToken.middleware');

const userRouter = Router();

userRouter.post('/', userController.createUser);
userRouter.use(authToken);
userRouter.get('/', userController.getAllUsers);
userRouter.delete('/me', userController.removeMyUser);
userRouter.get('/:id', userController.getUserById);

module.exports = userRouter;