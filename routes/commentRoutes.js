// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/commentController');

// Create Comment
router.post('/:postId/comments', auth, createComment);

// Update Comment
router.put('/:postId/comments/:commentId', auth, updateComment);

// Delete Comment
router.delete('/:postId/comments/:commentId', auth, deleteComment);

module.exports = router;
