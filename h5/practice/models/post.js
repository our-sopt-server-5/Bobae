const pool = require('../modules/pool');
const table = 'post';

const post = {
    createPost: async (title, useridx, author, content) => {

        const fields = 'title, useridx, author, content';
        const questions = '?,?,?,?';
        const values = [title, useridx, author, content];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            console.log('Create post - result: ', result);
            return 1;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createPost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createPost ERROR: ', err);
            throw err;
        }
    },
    getPost: async (id) => {
        const query = `SELECT * FROM ${table} WHERE postidx = "${id}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            throw err;
        }

    },
    getPostList: async () => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            throw err;
        }
    },
    updatePost: async (id, title, content) => {
        const query = `UPDATE ${table} SET title = "${title}", content = "${content}" WHERE postidx = "${id}"`;
        try {
            const result = await pool.queryParamArr(query);
            console.log('Update post - result: ', result);
            if (result.affectedRows > 0) return false;
            else return true;
        } catch (err) {
            throw err;
        }
    },
    deletePost: async (id) => {
        const query = `DELETE FROM ${table} WHERE postidx = "${id}"`;
        try {
            const result = await pool.queryParamArr(query);
            console.log('Delete post - result: ', result);
            if (result.affectedRows > 0) return false;
            else return true;
        } catch (err) {
            throw err;
        }
    },

}

module.exports = post;
