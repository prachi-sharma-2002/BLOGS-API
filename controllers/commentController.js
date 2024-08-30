// controllers/commentController.js
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

exports.createComment = async (req, res) => {
    const { content } = req.body;

    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        const comment = new Comment({
            content,
            postId: req.params.postId,
            author: req.user.id,
        });

        await comment.save();
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateComment = async (req, res) => {
    const { content } = req.body;

    try {
        let comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        comment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            { $set: { content } },
            { new: true }
        );

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.json({ msg: 'Comment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
