const categoryService = require('../services/category.service');

const createCategory = async (req, res, next) => {
    const { name } = req.body;
    try {
        const result = await categoryService.createCategory(name);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const getAllCategories = async (_req, res) => {
    const result = await categoryService.getAllCategories();
    res.status(200).json(result);
};

module.exports = {
    createCategory,
    getAllCategories,
};