var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const authUtil = require('../middlewares/auth');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/profile/:id', authUtil.checkToken, userController.readProfile);
router.get('/profile', authUtil.checkToken, userController.readAllProfile);

module.exports = router;