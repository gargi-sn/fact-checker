require('dotenv').config();

const config = require('./config/config');
//const multerConfig = require('./config/multer_config');
const express = require('express');
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const userRouter = require('./router/user_router.js');
const postRouter = require('./router/post_router.js');
const commentRouter = require('./router/comment_router');
const adminRouter = require('./router/admin_router');



const MONGO_URL = config.MONGO_URL;
const PORT = config.PORT;
const db = config.DB_NAME; 

mongoose.connect(MONGO_URL, {useUnifiedTopology: true, useNewUrlParser:true});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/factcheck', {cacheControl: true, setHeaders: (res, path)=>{
  res.setHeader('Cache-Control', 'public, max-age=360000');
}})); 
app.use(express.static(__dirname + '/static', {cacheControl: true, setHeaders: (res, path)=>{
  res.setHeader('Cache-Control', 'public, max-age=360000');
}})); 
app.use(cors());


/* 
* router  
*/
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);


app.listen(PORT, ()=>{
    console.log("server started at " + PORT);
})
