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
    if (await UserModel.checkUser(id)) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    }

    const salt = encrypt.makeSalt();
    const pwd = encrypt.encryption(password, salt);

    const idx = await UserModel.signup(id, name, pwd, salt, email);
    if (idx === -1) {
        return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, { userId: id }));
});

router.post('/signin', async (req, res) => {
    // request body 에서 데이터 가져오기
    const { id, password } = req.body;

    // request data 확인 - 없다면 Null Value 반환
    if (!id || !password) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    
    // 아이디가 존재하는가?
    if (! await UserModel.checkUser(id)) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    
    const user = await UserModel.getUserById(id);
    if (user[0] === undefined) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

    // password 확인
    if (user[0].password !== encrypt.encryption(password, user[0].salt)) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    }
    
    // 성공 - login success와 함께 user Id 반환
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS));

})

router.get('/profile/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    // 아이디가 존재하는가?
    if (! await UserModel.checkUser(id)) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }
    
    user = await UserModel.getUserById(id)
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS,
            {
                userId: user.id,
                name: user.name,
                email: user.email
            }));    
})

// Practice
router.get('/profile', async (req, res) => {
    userList = await UserModel.getUserList()
    return res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS,
        {
            userList
        }));   
});

module.exports = router;
