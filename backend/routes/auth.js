import express from 'express';
import { signup, login, getProfile, updateProfile, changePassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const validateSignup = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  }
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  }
];

const validateProfileUpdate = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  }
];

const validatePasswordChange = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  }
];

// Public routes
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, validateProfileUpdate, updateProfile);
router.put('/change-password', protect, validatePasswordChange, changePassword);

export default router; 