const express = require('express');
const router = express.Router();
const authorDetails = require('../controller/authorController');
const blogDetails = require('../controller/blogController');
const authorLogin= require('../controller/loginController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorisation');



router.post('/authors', authorDetails.author)
router.post('/blogs',blogDetails.blog)
router.get('/blogs/:authorId',authentication.authenticate,authorization.authorize,blogDetails.getblogs)
router.put('/blogs/:authorId/:blogId',authentication.authenticate,authorization.authorize,blogDetails.editblog)
router.delete('/blogs/:authorId/:blogId',authentication.authenticate,authorization.authorize,blogDetails.deleteBlogById)
router.delete('/blogs/:authorId',authentication.authenticate,authorization.authorize,blogDetails.deletedBlogByQuery)
router.post('/login',authorLogin.login)


module.exports = router;