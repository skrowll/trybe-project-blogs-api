const { Router } = require('express');
const categoryController = require('../controllers/category.controller');
const authToken = require('../middlewares/authToken.middleware');

const categoryRouter = Router();

categoryRouter.use(authToken);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);

module.exports = categoryRouter;