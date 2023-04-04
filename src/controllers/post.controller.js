const postService = require('../services/post.service');
const getUserId = require('../helpers/getUserId');

const createPost = async (req, res, next) => {
    const token = req.headers.authorization;
    const userId = await getUserId(token);
    const { title, content, categoryIds } = req.body;
    try {
        const result = await postService.createPost(userId, title, content, categoryIds);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (_req, res) => {
    const result = await postService.getAllPosts();
    res.status(200).json(result);
};

const getPostById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await postService.getPostById(id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const token = req.headers.authorization;
    const userId = await getUserId(token);
    try {
      const result = await postService.updatePost(id, { title, content }, userId);
      res.status(200).json(result);
    } catch (error) {
        next(error);
    }
  };

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
}; 