const router = require('express').Router();
const userController = require('../controller/user_controller');
const multerConfig = require('../config/multer_config');
const jwtParser = require('../middlewares/jwtParser.js');

router.get('/verify-account/:hash', userController.verify_user);
router.get('/view-user/:userId', userController.view_user);
router.post('/get-notifications', jwtParser.jwtParse, userController.fetch_notifications)
router.post('/login', userController.login);
router.post('/login-jwt', userController.login_with_token)
router.post('/sign-up', userController.signup);
router.post('/profile', userController.profile)
router.put('/profile-update', userController.profile_update);
router.post('/profile-pic', multerConfig.profile_upload.single('profile_pic'), userController.profile_pic);
router.post('/query', userController.sub_query);
router.post('/forgot-password', userController.forgotPassword);
router.put('/submit-new-password', userController.changeForgottenPassword);



module.exports = router;
 