const pool = require('../modules/pool');
const encrypt = require('../modules/encryption');
const table = 'user';

const user = {
    signup: async (id, name, password, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = '?,?,?,?,?';
        const values = [id, name, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            console.log('Sign up - result: ', result);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR: ', err);
            throw err;
        }
    },
    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else
                return true;
        } catch (err) {
            throw err;
        }
    },
    signin: async (id, password) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result[0].password !== encrypt.encryption(password, result[0].salt)) {
                // 비밀번호가 일치하지 않는가?
                return -1;
            }
            console.log(result[0])
            return result[0].useridx;

        } catch (err) {
            throw err;
        }
    },
    getUserById: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            throw err;
        }
    },
    getUserList: async () => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            throw err;
        }
    },
}

module.exports = user;
