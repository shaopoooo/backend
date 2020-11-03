const router = require('express').Router();

const user = require('./user');

router.get('/', (req, res) => res.send('server allive'));

router.use('/user', user);

module.exports = router;
