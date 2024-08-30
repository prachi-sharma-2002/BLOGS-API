// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)

    try {
        let user = await User.findOne({ username });
        console.log(user)
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, password });
        await user.save();

        const payload = { user: { id: user.id } };

        /*jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );*/
        res.json(
          payload
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

/*exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
      // Check if the user already exists
      let user = await User.findOne({ username });
      if (user) {
          return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      user = new User({ username, password: hashedPassword });
      await user.save();

      // Return the user id and username instead of a JWT token
      res.status(201).json({
          id: user._id,
          username: user.username
      });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};*/



exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

