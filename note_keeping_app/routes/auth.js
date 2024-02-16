const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// // Apply CORS policy
// router.use(cors({
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
//     credentials: true
// }));


// Rate limiter for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
});



// Middleware to validate token and set user in the request
const auth = (req, res, next) => {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};


// New /user endpoint to get user info
router.get('/user', auth, async (req, res) => {
    try {
        console.log("Hello from /user endpoint");
        console.log(req.user);
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Signup route
router.post('/signup', [
    body('username').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        });
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: true, // set to true if using https
                sameSite: 'None',
                maxAge: 18000000,
            }).json({ username: user.username });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/login', loginLimiter, [
    body('email').isEmail(),
    body('password').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: true, // set to true if using https
                sameSite: 'None',
                maxAge: 18000000,
            }).json({ username: user.username });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/logout', (req, res) => {
    res.cookie('token', '', { // Overwrite the 'token' cookie with an empty value
        httpOnly: true,
        expires: new Date(0), // Set the cookie to expire immediately
        secure: true, // Set to true if you're using HTTPS, adjust according to your environment
        sameSite: 'None', // Adjust according to your requirements
    }).sendStatus(200); // Send a 200 OK status to indicate successful logout
});




module.exports = router;
