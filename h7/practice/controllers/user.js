const UserModel = require('../models/user');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');

module.exports = {
    signup: async (req, res) => {
        const {
            id,
            name,
            password,
            email
        } = req.body;
        if (!id || !name || !password || !email) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }
        // 사용자 중인 아이디가 있는지 확인
        if (await UserModel.checkUser(id)) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.ALREADY_ID));
            return;
        }
        const {
            salt,
            hashed
        } = await encrypt.encrypt(password);
        const idx = await UserModel.signup(id, name, hashed, salt, email);
        if (idx === -1) {
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.CREATED_USER, {
                userId: idx
            }));
    },
    signin: async (req, res) => {
        const {
            id,
            password
        } = req.body;
        if (!id || !password) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }

        // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
        const user = await UserModel.getUserById(id);
        if (user[0] === undefined) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NO_USER));
        }
        // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
        const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
        if (hashed !== user[0].password) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.MISS_MATCH_PW));
        }

        const {
            token,
            refreshToken
        } = await jwt.sign(user[0]);

        // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.LOGIN_SUCCESS, {
                accessToken: token
                //, refreshToken: refreshToken
            }));
    },
    updateProfile: async (req, res) => {
        // 데이터 받아오기
        const userIdx = req.decoded.userIdx;
        const profileImg = req.file.location; // 파일 데이터
        // const profileImg = req.file.path; // 파일 데이터
        console.log(req);

        // data check - undefined
        if (profileImg === undefined || !userIdx) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        // image type check
        const type = req.file.mimetype.split('/')[1];
        if (type !== 'jpeg' && type !== 'jpg' && type !== 'png'){
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.UNSUPPORTED_TYPE));       
        }
        // call model - database
        const result = await UserModel.updateProfile(userIdx, profileImg);
        res.status(CODE.OK).send(util.success(CODE.OK, MSG.UPDATE_PROFILE_SUCCESS, result));
    },
    uploadSelfies: async (req, res) => {
        /*
        여러개의 파일들을 req.files에 저장
        req.file[i].location: 파일의 위치
        maxCount의 개수만큼 받아옴
        */
        const userIdx = req.decoded.userIdx;
        const selfies = req.files;
        if (selfies === undefined || !userIdx){
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        const types = selfies.map(selfie => selfie.mimetype.split('/')[1]);
        for(type of types){
            if (type !== 'jpeg' && type !== 'jpg' && type !== 'png'){
                return res.status(CODE.BAD_REQUEST)
                    .send(util.fail(CODE.BAD_REQUEST, MSG.UNSUPPORTED_TYPE));       
            }
        }

        const locations = selfies.map(selfie => selfie.location);
        for(location of locations){
            await UserModel.uploadSelfies(userIdx, location);
        }

        res.status(CODE.OK).send(util.success(CODE.OK, MSG.UPLOAD_SELFIES_SUCCESS, {
            'selfies': locations
        }));
    },
    getSelfies: async (req, res) => {
        const userIdx = req.decoded.userIdx;
        if (!userIdx){
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        const selfies = await UserModel.getSelfieByIdx(userIdx);
        const result = selfies.map(img => img.selfie);
        res.status(CODE.OK).send(util.success(CODE.OK, MSG.READ_SELFIES_SUCCESS, {
            'selfies': result
        }));
    },
}