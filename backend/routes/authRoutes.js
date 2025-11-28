const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', [
  body('name').notEmpty().trim(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], auth.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], auth.login);

router.post('/logout', auth.logout);
router.get('/me', protect, auth.getProfile);
router.put('/me', protect, auth.updateProfile);

module.exports = router;
