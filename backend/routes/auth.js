const router = require('express').Router();
const { protect } = require('../middleware/auth');
const { login, verifyToken } = require('../controllers/authController');

router.post('/login', login);
router.get('/verify', protect, verifyToken);

module.exports = router;
