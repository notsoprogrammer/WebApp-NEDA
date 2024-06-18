
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import log from '../middleware/logger.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      log(`Decoded token: ${JSON.stringify(decoded)}`);

      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        log('Not authorized, user not found');
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      log(`User in middleware: ${JSON.stringify(req.user)}`);
      next();
    } catch (error) {
      log(`Error verifying token: ${error.message}`);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    log('No token found');
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };




