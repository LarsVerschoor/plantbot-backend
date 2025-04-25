const router = require('express').Router();

// Middlewares
const authenticate = require('../middlewares/auth/authenticate');

// Controllers
const registerController = require('../controllers/auth/register');
const verifyController = require('../controllers/auth/verify');
const loginController = require('../controllers/auth/login');

const getConnectUUID = require('../controllers/connect-uuid');
const chat = require('../controllers/chat');

// Routing
router.post('/register', registerController);
router.post('/verify', verifyController);
router.post('/login', loginController);

router.get('/connect-uuid', authenticate, getConnectUUID);
router.post('/chat', authenticate, chat);

module.exports = router;