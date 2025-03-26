const router = require('express').Router();

// Middlewares
const authenticate = require('../middlewares/auth/authenticate');

// Controllers
const registerController = require('../controllers/auth/register');
const verifyController = require('../controllers/auth/verify');
const loginController = require('../controllers/auth/login');

// Routing
router.post('/register', registerController);
router.post('/verify', verifyController);
router.post('/login', loginController);

module.exports = router;