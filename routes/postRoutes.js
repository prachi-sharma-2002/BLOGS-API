// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/postController');

// Create Post
router.post('/', auth, createPost);

// Get All Posts
router.get('/', getPosts);

// Get Post by ID
router.get('/:id', getPostById);

// Update Post
router.put('/:id', auth, updatePost);

// Delete Post
router.delete('/:id', auth, deletePost);

module.exports = router;
