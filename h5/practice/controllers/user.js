const jwt = require('../modules/jwt');
const encrypt = require('../modules/encryption');
const util = require('../modules/util')
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const UserModel = require('../models/user');

const user = {
    signup: async (req, res) => {
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
    },
    signin: async (req, res) => {
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
        
        const { token, _ } = await jwt.sign(user[0]);
        
        
        // 성공 - login success와 함께 user Id 반환
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, { accessToken : token}));
    },
    readProfile: async (req, res) => {
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
        
        const user = await UserModel.getUserById(id)
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS,
                {
                    userId: user[0].id,
                    name: user[0].name,
                    email: user[0].email
                }));    
    },
    readAllProfile: async (req, res) => {
        userList = await UserModel.getUserList()
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS,
            {
                userList
            }));   
    },

}

module.exports = user;