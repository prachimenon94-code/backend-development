const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                message: 'No token, authorization denied'
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user ID in request
        req.userId = decoded.userId;

        // Continue to route
        next();

    } catch (error) {
        res.status(401).json({
            message: 'Token is not valid'
        });
    }
};

module.exports = auth;