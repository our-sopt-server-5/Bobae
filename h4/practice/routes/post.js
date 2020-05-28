var express = require('express');
var router = express.Router();

let util = require('../modules/util')
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let PostModel = require('../models/post');

router.get('/', function (req, res, next) {
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.POST_SUCCESS, PostModel));
});

router.post('/', async (req, res) => {
    // id title content date author 
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    
    let id;
    if (PostModel.length == 0) id = 1;
    else id = PostModel[PostModel.length - 1].id + 1;
    const date = new Date();
    
    PostModel.push({ id, title, content, date, author });
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.POST_CREATE_SUCCESS, { postId: id, postTitle: title }));
})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    const post = PostModel.filter(post => post.id == id);
    if (post.length == 0) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.POST_FAIL));
    }

    // id title content date author 
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POST_SUCCESS,
            {
                id: post[0].id,
                title: post[0].title,
                content: post[0].content,
                date: post[0].date,
                author: post[0].author
            }));
})


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    if (!title || !content || !id) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    for (key in PostModel) {
        if (PostModel[key].id == id) {
            PostModel[key].title = title;
            PostModel[key].content = content;

            return res.status(statusCode.OK)
                .send(util.success(statusCode.OK, resMessage.POST_UPDATE_SUCCESS,
                    {
                        id: PostModel[key].id,
                        title: PostModel[key].title,
                        content: PostModel[key].content
                    }));
        }
    }

    return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.POST_UPDATE_FAIL));

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }

    for (key in PostModel) {
        if (PostModel[key].id == id) {
            delete PostModel[key];
            PostModel = PostModel.filter(data => data != null); // null 값 남는 것 제거
            return res.status(statusCode.OK)
                .send(util.success(statusCode.OK, resMessage.POST_DELETE_SUCCESS, { deleteId: id }));
        }
    }

    return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.POST_DELETE_FAIL));

})


module.exports = router;
