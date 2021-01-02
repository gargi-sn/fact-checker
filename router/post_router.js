const router = require('express').Router();
const multerConfig = require('../config/multer_config');
const postController = require('../controller/posts_controller');
const jwtMiddleWare = require('../middlewares/jwtParser.js');


router.get('/post-by-id/:postId/:token', jwtMiddleWare.jwtParse, postController.post_by_id);
router.post('/news-updates/:date/:skip',jwtMiddleWare.jwtParse, postController.get_news_updates);
router.post('/get-post/:skip',jwtMiddleWare.jwtParse, postController.get_post);
router.post('/get-users-posts/:skip',jwtMiddleWare.jwtParse, postController.get_single_user_posts);
router.post('/submit-post',jwtMiddleWare.jwtParse, postController.submit_post);
router.post('/add-media', multerConfig.media_upload.single('post_media'), postController.add_media);
router.put("/react-true", jwtMiddleWare.jwtParse, postController.reactTrue);
router.put("/react-false", jwtMiddleWare.jwtParse, postController.reactFalse);
router.put("/report", jwtMiddleWare.jwtParse, postController.report);
router.delete("/post-delete/:postId", jwtMiddleWare.jwtParse, postController.postDelete);
//router.post("/get", postController.get_posts);


module.exports = router;  