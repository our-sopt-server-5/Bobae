var express = require('express');
var router = express.Router();

let util = require('../modules/util')
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let PostModel = require('../models/post');

router.get('/', async (req, res) => {
    const post = await PostModel.getPostList()
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POST_SUCCESS, post));
});

router.post('/', async (req, res) => {
    // id title content date author 
    const { title, author, content } = req.body;
    if (!title || !content || !author) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    
    const post = await PostModel.createPost(title, author, content);
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POST_CREATE_SUCCESS));
})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const post = await PostModel.getPost(id);
    if (post.length == 0) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.POST_FAIL));
    }

    // id title content date author 
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POST_SUCCESS,
            {
                id: post[0].postidx,
                title: post[0].title,
                content: post[0].author,
                date: post[0].content,
                author: post[0].date
            }));
})


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    if (!title || !content || !id) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    const post = await PostModel.updatePost(id, title, content);
    if (post) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.POST_UPDATE_FAIL));
    }
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POST_UPDATE_SUCCESS,
            {
                id: id,
                title: title,
                content: content
            }));
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const post = await PostModel.deletePost(id);
    if (post) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.POST_DELETE_FAIL));
    }
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POST_DELETE_SUCCESS, { deleteId: id }));
})


module.exports = router;
