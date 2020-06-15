const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');
// const multer = require('multer');
// const upload = multer({
//     dest: 'upload/'
// });
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️
    RESPONSE DATA : user profile
*/
/*
동작원리?
-> 1. 토큰 확인 (허용된 유저인가)
-> 2. AWS S3 파일 업로드 [Single(1개) or Array(여러개)]: 업로드 후, 파일 주소를 req.files에 넣어서 준다.
-> 3. Controller의 메서드로 들어가서 req.files에 대해 검증하고, 모델 저장 등 로직 수행.
*/
router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);
router.get('/selfies', AuthMiddleware.checkToken, UserController.getSelfies);
router.post('/selfies', AuthMiddleware.checkToken, upload.array('selfies', 10), UserController.uploadSelfies);

module.exports = router;