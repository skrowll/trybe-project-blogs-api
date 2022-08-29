const { Category } = require('../database/models');

const createCategory = async (name) => {
    if (!name) {
        const error = new Error('"name" is required');
        error.code = 'BadRequest';
        throw error;
    }

    const result = await Category.create({ name });

    return result;
};

const getAllCategories = async () => {
    const result = await Category.findAll();
    return result;
};

module.exports = { 
    createCategory,
    getAllCategories,
};