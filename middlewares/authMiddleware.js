const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const [scheme, token] = authHeader.split(' ');

        if (scheme && token && scheme.toLowerCase() === 'bearer') {
            try {
                const secret = process.env.JWT_SECRET || 'Login_JWT_Token';
                const decoded = jwt.verify(token, secret);

                req.user = await User.findById(decoded.id).select('-password');
                if (!req.user) {
                    return res.status(401).json({ success: false, message: "User not found or token invalid" });
                }

                return next();
            } catch (error) {
                return res.status(401).json({ success: false, message: "Not authorized, token failed or expired" });
            }
        }
    }

    return res.status(401).json({ success: false, message: "Not authorized, no token provided" });
};

// Authorize middleware - Role-Based Access Control (RBAC)
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authorized, user not authenticated" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: User role '${req.user.role}' does not have permission to perform this action`
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
