// controllers/postController.js
const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    const { title, content, tags } = req.body;

    try {
        const post = new Post({
            title,
            content,
            tags,
            author: req.user.id,
        });

        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPosts = async (req, res) => {
    const { page = 1, limit = 10, category, search } = req.query;

    try {
        const query = {};
        if (category) {
            query.tags = { $in: [category] };
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }

        const posts = await Post.find(query)
            .populate('author', ['username'])
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', ['username']);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updatePost = async (req, res) => {
    const { title, content, tags } = req.body;

    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: { title, content, tags } },
            { new: true }
        );

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

