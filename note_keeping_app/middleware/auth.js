const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Ensure you have cookie-parser installed and used in your app

module.exports = function (req, res, next) {
    // Assuming the token is stored in a cookie named 'token'
    const token = req.cookies['token']; // Access the token directly from req.cookies

    // If no token is found in cookies, deny access
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach user to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

