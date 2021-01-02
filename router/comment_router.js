const router = require('express').Router();
const multerConfig = require('../config/multer_config');
const commentController = require('../controller/comments_controller');
const jwtMiddleWare = require('../middlewares/jwtParser.js');


router.post('/get-comments', jwtMiddleWare.jwtParse, commentController.getComments);
router.post('/get-comments-single-user', jwtMiddleWare.jwtParse, commentController.getCommentsForSingleUser);
router.post('/submit-comment', jwtMiddleWare.jwtParse, commentController.submitComment);
router.put('/upvote-comment', jwtMiddleWare.jwtParse, commentController.upvoteComment);
router.put('/downvote-comment', jwtMiddleWare.jwtParse, commentController.downvoteComment);
router.put('/delete-comment', jwtMiddleWare.jwtParse, commentController.deleteComment)

module.exports = router;