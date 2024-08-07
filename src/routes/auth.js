const auth = require('../controllers/auth.js');
const router = require('express').Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/refresh_token', auth.refreshToken);

module.exports = router;
