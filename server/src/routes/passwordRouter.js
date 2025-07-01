import express from 'express';
import { forgotPassword, resetPassword } from '../controller/passwordController.js';

const router = express.Router();

// POST: request password reset
router.post('/forgot-password', forgotPassword);

// POST: reset the password
router.post('/reset-password', resetPassword);

export default router;