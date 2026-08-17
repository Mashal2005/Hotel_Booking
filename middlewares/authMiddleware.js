const jwt = require('jsonwebtoken')
const {user,admin,manger}=require('../Utils/constants')
const ApiError=require('../Utils/ApiError')
const user = require('../Models/User')
const {
    USER,
    ADMIN,
    HOTELOWNER
}=require('../Utils/constants')

// Verifies the JWT and attaches the user to req.user
const protect = async (req, res, next) =>{}
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        const error = new ApiError("Not authorized", 401);
        return next(error);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
        const error = new ApiError("Not authorized, user no longer exists", 401);
        return next(error);
        }

        if (!user.isActive) {
        const error = new ApiError("Account has been deactivateds", 403);
        return next(error)
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
        const error=  ApiError('Token expired, please log in again',401)
        return next(error)//res.status(401).json({ message: 'Token expired, please log in again' });
        }
        const error= ApiError('Not authorized, invalid token',401)
        return next(error)//res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

// Restricts access to specific roles, e.g. authorize('admin', 'hotelOwner')
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
        const error =ApiError('Not authorized',401)
        return next(error)//res.status(401).json({ message: 'Not authorized' });
        }

        if (!allowedRoles.includes(req.user.role)) {
        const error =ApiError(`Role '${req.user.role}' is not permitted to perform this action`,403)
        return next(error)
        }

        next();
    };
};

module.exports = { protect, authorize }