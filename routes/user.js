const router = require('express').Router();

const { authLogin } = require('../utils/auth');
const user = require('../controllers/user');

// login
router.post('/', user.login);

/*-------------------------------------------------------------------------*/

// below APIs are protected to unlogin user
router.use('/', authLogin);

/*-------------------------------------------------------------------------*/

// logout
router.delete('/', (req, res) => res.send('logout success'));

// getUserInfo
router.get('/', user.read);

// updateUserInfo
router.put('/', (req, res) => res.send('update user info'));

// sign up by super
router.post('/new', user.create);

// delete account by super
router.delete('/super', (req, res) => res.send('delete by super'));

router.get('/super', (req, res) => res.send('get all user info'));

router.put('/super', (req, res) => res.send('update user info'));

module.exports = router;
