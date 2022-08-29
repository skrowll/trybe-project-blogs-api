const { BlogPost, User, Category, PostCategory } = require('../database/models');
const { postValidate } = require('../middlewares/validation.middleware');

const createPost = async (userId, title, content, categoryIds) => {
    const errorMessage = await postValidate(title, content, categoryIds);
    if (errorMessage) {
        const error = new Error(errorMessage);
        error.code = 'BadRequest';
        throw error;
    }
    const { dataValues } = await BlogPost
        .create({ title, content, userId, published: new Date(), updated: new Date() });
    await PostCategory.bulkCreate(categoryIds.map((categoryId) => ({
        postId: dataValues.id,
        categoryId,
    })));
    return dataValues;
};

const getAllPosts = async () => {
    const result = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', attributes: ['id', 'name'] },
        ],
    });
    return result;
};

const getPostById = async (id) => {
    const result = await BlogPost.findOne({
        where: { id },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', attributes: ['id', 'name'] },
          ],
    });
    if (!result) {
        const error = new Error('Post does not exist');
        error.code = 'NotFound';
        throw error;
    }
    return result;
};

const updateValidate = (dataValues, data, userId) => {
    const { title, content } = data;
    if (title === '' || content === '') {
        const error = new Error('Some required fields are missing');
        error.code = 'BadRequest';
        throw error;
    }
    if (userId !== dataValues.userId) {
        const error = new Error('Unauthorized user');
        error.code = 'Unauthorized';
        throw error;
    }
};

const updatePost = async (id, data, userId) => {
    const { title, content } = data;
    const { dataValues } = await BlogPost.findByPk(id, { include:
        [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    updateValidate(dataValues, data, userId);

    await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });

    const result = await BlogPost.findByPk(id, { include:
    [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
    return result;
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
};