const { Router } = require('express');
const postController = require('../controllers/post.controller');
const authToken = require('../middlewares/authToken.middleware');

const postRouter = Router();

postRouter.use(authToken);
postRouter.post('/', postController.createPost);
postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.put('/:id', postController.updatePost);

module.exports = postRouter;