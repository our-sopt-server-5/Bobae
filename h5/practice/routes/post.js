var express = require('express');
var router = express.Router();

const postController = require('../controllers/post');
const authUtil = require('../middlewares/auth');

router.get('/', authUtil.checkToken, postController.getAllPost);
router.get('/:id', authUtil.checkToken, postController.getPost);
router.post('/', authUtil.checkToken, postController.createPost);
router.put('/:id', authUtil.checkToken, postController.updatePost);
router.delete('/:id', authUtil.checkToken, postController.deletePost);

module.exports = router;