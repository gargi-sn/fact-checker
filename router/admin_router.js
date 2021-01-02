const router = require('express').Router();
const adminController = require('../controller/admin_controller');
const jwtMiddleWare = require('../middlewares/jwtParser.js');

router.post('/get-users',jwtMiddleWare.jwtParse, adminController.getUsers)
router.post("/dashboard", jwtMiddleWare.jwtParse, adminController.dashboard)
router.put('/update-user',jwtMiddleWare.jwtParse, adminController.user_update)

router.post('/get-posts',jwtMiddleWare.jwtParse, adminController.get_post)
router.delete('/remove-post/:postId/:userId', jwtMiddleWare.jwtParse, adminController.removePost);
router.put('/hide-post', jwtMiddleWare.jwtParse, adminController.hide_post);
router.put('/unhide-post', jwtMiddleWare.jwtParse, adminController.unhide_post);
router.post('/get-queries', jwtMiddleWare.jwtParse, adminController.getQueries);

module.exports = router;