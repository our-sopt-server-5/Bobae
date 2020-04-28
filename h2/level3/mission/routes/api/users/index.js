var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API - Users' });
});
router.use('/login', require('./login'));
router.use('/signup', require('./signup'));

module.exports = router;
