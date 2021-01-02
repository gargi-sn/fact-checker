const multer = require('multer');

const PROPIC_STORAGE =  multer.diskStorage({
    destination : function(req, file, cb){
      cb(null, './static/profile_pics/');

    },
    filename : function(req, file, cb){
      const name = file.fieldname + Date.now()+ "." + file.originalname.split('.')[1];
      cb(null, name);
    }
  })

const MEDIA_STORAGE = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './static/post_media/');
  },
filename: function(req, file, cb){
  const name = file.fieldname + Math.random() + Date.now() + "." +  file.originalname.split('.')[1];
  cb(null, name);
}
})  

 
exports.profile_upload = multer({storage: PROPIC_STORAGE});
exports.media_upload = multer({storage: MEDIA_STORAGE}); 