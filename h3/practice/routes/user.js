var express = require('express');
var router = express.Router();

let encrypt = require('../modules/encryption');
let util = require('../modules/util')
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let UserModel = require('../models/user');

router.get('/', function (req, res, next) {
    res.status(200).send(UserModel);
    
});

router.post('/signup', async (req, res) => {
    const { id, name, password, email } = req.body;
    // Manage errors
    // 1. empty value
    if (!id || !name || !password || !email) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    // 2. duplicated id
    if (UserModel.filter(user => user.id == id).length > 0) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    }
    const salt = encrypt.makeSalt();
    const pwd = encrypt.encryption(password, salt);
    UserModel.push({ id, name, 'password':pwd, salt, email });
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, { userId: id }));
});

/* 
    ✔️ sign in
    METHOD : POST
    URI : localhost:3000/user/signin
    REQUEST BODY : id, password
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
*/
router.post('/signin', async (req, res) => {
    // request body 에서 데이터 가져오기
    const { id, password } = req.body;

    // request data 확인 - 없다면 Null Value 반환
    if (!id || !password) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    const user = UserModel.filter(user => user.id == id);
    if (user.length == 0) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

    // 비밀번호 확인 - 없다면 Miss match password 반환
    if (user[0].password !== encrypt.encryption(password, user[0].salt)) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST,
            resMessage.MISS_MATCH_PW));
    }

    // 성공 - login success와 함께 user Id 반환
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, { userId: user[0].id }));

})

router.get('/profile/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
                return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    const user = UserModel.filter(user => user.id == id);
    if (user.length == 0) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS,
            {
                userId: user[0].id,
                name: user[0].name,
                email: user[0].email
            }));

    
})

router.get('/debug', (req, res) => {
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    res.send("HELLO");
});

module.exports = router;
