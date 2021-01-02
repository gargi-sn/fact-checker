const dbusers = require('../models/dbusers.js');
const dbposts = require('../models/dbposts.js');
const config = require('../config/config');
const mongoose = require('mongoose');




exports.submit_post = async function(req, res){
    /*
     * submit new posts the email is extracted via jwt if not email then user is not logged in and 
     * therefore not allowed to post.
     * the function finds the user using email.
     * then new dbPosts object is created with required fields and saved into the database using .save().
     * we return a response of either the data is saved or not.
     * 
     */
    try{
        
        const email = req.body.email;
        if(!email)
           throw new Error("unAuthenticated");

        const user = await dbusers.findOne({email: email}); 
        const Post = new dbposts({
            content : req.body.content,
            user_id : user._id,
            trueFlag : 0,
            fakeFlag : 0,
            reports : 0,
            newsMedium : req.body.newsMedium       
        });

       await Post.save((err)=>{
        if(err){
            console.error(err);
        }else{ 
         res.status(201).json({status:true, message:"data saved"});
        }  
    });
    }catch(e){
       if(e.message == "unAuthenticated"){
            res.status(401);
       }else if(e.name === "validationError"){
           res.status(400);
       } 
       res.json({
           status: false, 
           message: "some error occured the post wasn't saved"
       })
    }
}



exports.get_post = async function(req, res){
    try{
        //const post_id = req.body.post_id;
        const email = req.body.email || "";
        const skip = Number.parseInt(req.params.skip);
        let postData = await dbposts
                             .find().populate({path: 'user_id', select:"_id firstname lastname profile_pic"})
                             .select("-date -__v")
                             .lean()
                             .sort({time: -1})
                             .skip(skip)
                             .limit(8);
       /*
        let userIdArray= [];

        console.log(postData);
        
        await new Promise((resolve, reject)=>{

            setTimeout(()=>{
                for(let indiPost of postData){
                    userIdArray.push(mongoose.Types.ObjectId(indiPost.user_id._id));
                }
                resolve();
            }, 0);

        })
        
        const userData = await dbusers
                                .find({_id: {$in : userIdArray}}, "firstname lastname _id profile_pic")
                                .sort({_id: 1});

        */
       await new Promise((resolve, reject)=>{
           setTimeout(()=>{
               postData.map((indiPost)=>{
                   
               // const index = userIdArray.indexOf(indiPost.user_id._id);
               // indiPost.userDetails = userData[index];
               // userIdArray.splice(index, 1);
                indiPost.time = new Date(indiPost.time).toUTCString();

                if(indiPost.fakeFlag.indexOf(email) > 0 || indiPost.trueFlag.indexOf(email) > 0){
                    indiPost.voted = indiPost.fakeFlag.indexOf(email) > 0? "false" : "true"; 
                    indiPost.trueCount = indiPost.trueFlag.length - 1 ;
                    indiPost.falseCount = indiPost.fakeFlag.length - 1 ;
                }else{
                    indiPost.trueCount = null;
                    indiPost.falseCount  = null;
                }

                delete indiPost["fakeFlag"];
                delete indiPost["trueFlag"];
                delete indiPost["comments"];
               });
               resolve();
           },0);
       });
       
      /*
       await new Promise((resolve, reject)=>{
           setTimeout(()=>{
               postData.sort((x, y)=>{
                  return x.time > y.time;
               });

               resolve();
           }, 0)
       });
       */
        res.status(200).json({status: true, data: postData});

    }catch(e){
        console.log(e);
        res.status(404).json({status: false, data: null});
    }
}

exports.get_news_updates = async function(req, res){
    try {
        const email = req.body.email || "";
        const date = req.params.date;
        let prevDate = new Date(date);
        prevDate = prevDate.getUTCMonth() + '-' + prevDate.getUTCDate() + '-' + prevDate.getFullYear();
        console.log(prevDate);
        const skip = Number.parseInt(req.params.skip);
        let postData = await dbposts
                             .find({time: {$gte: new Date(prevDate), $lt: new Date(date)}}).populate({path: 'user_id', select:"_id firstname lastname profile_pic"})
                             .select("-date -__v")
                             .lean()
                             .sort({downvotesCount: -1, commentsCount: -1 })
                             .skip(skip)
                             .limit(8);
      
       await new Promise((resolve, reject)=>{
           setTimeout(()=>{
               postData.map((indiPost)=>{
                indiPost.time = new Date(indiPost.time).toUTCString();
                if(indiPost.fakeFlag.indexOf(email) > 0 || indiPost.trueFlag.indexOf(email) > 0){
                    indiPost.voted = indiPost.fakeFlag.indexOf(email) > 0? "false" : "true"; 
                    indiPost.trueCount = indiPost.trueFlag.length - 1 ;
                    indiPost.falseCount = indiPost.fakeFlag.length - 1 ;
                }else{
                    indiPost.trueCount = null;
                    indiPost.falseCount  = null;
                }

                delete indiPost["fakeFlag"];
                delete indiPost["trueFlag"];
                delete indiPost["comments"];
               });
               resolve();
           },0);
       });
       
        res.status(200).json({status: true, data: postData});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({status:false, message: "some error occured"});
    }
}

exports.get_single_user_posts = async function(req, res){
    try{
        const email = req.body.email;
        if(!email)
           throw new Error("notAuthenticated")

        const user_id = req.body.user_id;
        const skip = Number.parseInt(req.params.skip);

        const resultData = await dbposts.find({user_id : mongoose.Types.ObjectId(user_id)}).populate(
           {
           path:"comments", 
           sort:{upvotesCount: -1}, 
           populate: {path:'user_id', select: "profile_pic _id firstname lastname"}, 
           options:{
               limit: 1
           }
         }).lean().select("-__v -user_id").skip(skip).limit(10);
         
        if(!resultData)
          throw new Error("noDataFound");

         for(let indiPost of resultData){
            indiPost.trueCount = indiPost.trueFlag.length -1 ;
            indiPost.fakeCount = indiPost.fakeFlag.length - 1;
            indiPost.totalReacts = indiPost.trueCount + indiPost.fakeCount;

            delete indiPost['trueFlag'];
            delete indiPost['fakeFlag'];
         }
        
        res.status(200).json({status: true, totalData: resultData.length, data: resultData});
        
    }catch(e){
        console.log(e.message);
        if(e.name === "MongoError"){
            res.status(400);
        }
        else{
            res.status(200);
        }
        res.json({status: false, totalData: 0, data: null});
    }
}


exports.post_by_id = async function(req, res){
    try{
         const postId = req.params.postId;
         const email = req.body.email || '';
         const skip = req.params.skip? req.params.skip : 0;
         const postData = await dbposts.find({_id : mongoose.Types.ObjectId(postId)}).populate(
                            {
                               path:'comments', 
                               select: "-post_id -__v",
                               populate: {path: 'user_id', select: "firstname lastname _id profile_pic"},
                               sort: {upvotesCount: -1}, 
                               options: {skip:0, limit : 8}

                            }).lean();

         if(!postData)
            throw new Error("noPostData");
 

         const userData = await dbusers.findOne({_id: postData[0].user_id}).select("firstname lastname _id profile_pic");
         if(!userData)
            throw new Error("noUserData")

          postData[0].userDetails = userData;
         
         /* 
          * setting the properties in postData to for fakecounts and trueCount also the user's reaction just like 
          * get_all_posts();
          */
         indiPost = postData[0];
         indiPost.time = new Date(indiPost.time).toUTCString();
         if(indiPost.fakeFlag.indexOf(email) >= 0 || indiPost.trueFlag.indexOf(email) >= 0){
             indiPost.voted = indiPost.fakeFlag.indexOf(email) > 0? "false" : "true"; 
             indiPost.trueCount = indiPost.trueFlag.length - 1 ;
             indiPost.falseCount = indiPost.fakeFlag.length - 1 ;
         }else{
             indiPost.trueCount = null;
             indiPost.falseCount  = null;
         }
         delete indiPost["fakeFlag"];
         delete indiPost["trueFlag"];
         /* 
          * deleted the unnecessary properties like fakeFlag and trueFalgs that contains all ObjectIds;
          */
         await new Promise((res, rej)=>{
            setTimeout(()=>{
               for(let comment of indiPost.comments){
                   if(comment.upvotes.indexOf(email) >= 0 || comment.downvotes.indexOf(email)>= 0){
                       comment.voted = comment.upvotes.indexOf(email)>=0? "upvote" : "downvote";
                   }
                   comment.upvotes = comment.upvotes.length;
                   comment.downvotes = comment.downvotes.length; 
               }
               res();
            }, 0);
          });

         res.status(200).json({status: true, data: postData}); 
 
    }catch(e){
        console.log(e);
        if(e.name === "MongoError")
            res.status(400);
        else
           res.status(200);
        res.json({status: false, data: null});
    }
}

exports.add_media = async function(req, res){
    try{
        const FILE_PATH  = req.file.path.split('static\\')[1];
        res.status(200).json({
            "status" : true,
            "builtImageLink" : config.HOST + FILE_PATH
        });
    }catch(e){
       res.status(200).json({
           "status" : false,
           "builtImageLink" : null
       });
    }
}


exports.reactTrue = async function(req, res){
    try{
        
        const email = req.body.email;
        if(!email)
          throw new Error("notAuthenticated");

        const postId  = req.body.postId;
        const updateData = await dbposts.findOneAndUpdate({_id: postId},
                         {
                             $addToSet : {trueFlag: email},
                             $inc : {upvotesCount: 1},
                             $pull : {fakeFlag: email}   
                         },{
                             returnOriginal: false,
                             useFindAndModify:false
                         });
          const data = {
              trueCount : updateData.trueFlag.length -1,
              falseCount : updateData.fakeFlag.length-1,
              voted : 'true'
          }
       // if(updateData.nModified > 0){
            res.status(200).json({
                status: true,
                message: "reaction updated",
                data : data
            });
       // }else{
        //    res.status(200).json({status: false, data: "reaction same"});   
       // }

    }catch(e){
        if(e.message == "notAuthenticated")
          res.status(401).json({status: false, message: "you need to login first"});
        else
          res.status(200).json({status: false, message: "some error occured"});
        
    }
}
exports.reactFalse = async function(req, res){
    try{
        
        const email = req.body.email;
        if(!email)
          throw new Error("notAuthenticated");
          
        const postId  = req.body.postId;
        const updateData = await dbposts
                                .findOneAndUpdate(
                                    {
                                        _id: postId
                                    },
                                    {
                                        $addToSet : {fakeFlag: email},
                                        $inc : {downvotesCount: 1},
                                        $pull : {trueFlag: email}   
                                    },
                                    {
                                      returnOriginal: false,
                                       useFindAndModify:false
                                    });
          const data = {
              trueCount : updateData.trueFlag.length -1,
              falseCount : updateData.fakeFlag.length-1,
              voted : 'false'
          }
       // if(updateData.nModified > 0){
            res.status(200).json({
                status: true,
                message: "reaction updated",
                data : data
            });
       // }else{
        //    res.status(200).json({status: false, data: "reaction same"});   
       // }

    }catch(e){
        if(e.message == "notAuthenticated")
        res.status(401).json({status: false, message: "you need to login first"});
      else
        res.status(200).json({status: false, message: "some error occured"});
    }
}


exports.report = async function(req, res){
    try {
         const email = req.body.email;
         if(!email)
            throw new Error("notAuthenticated");
         const postId = req.body.postId;
         const update = await dbposts.updateOne({_id : postId}, {$addToSet: {reports: email}, $inc: {reportsCount : 1}});
         
         res.status(202).json({status: true, message: "reported", data: null});
    } catch (error) {
        let message = error.message;
        if(error.message == 'notAuthenticated')
            res.status(401);
        else if(error.name == 'MongoError' || error.name== 'ValidationError')
            res.status(400);
        else 
            res.status(200);
        
        res.json({status: false, message: message, data: null});
    }
}



exports.postDelete = async function(req, res){
    try {
         if(!req.body.email)
           throw new Error("notAuhenticated");
         const deleteFlag = await dbposts.deleteOne({user_id: req.body.userId, _id: mongoose.Types.ObjectId(req.params.postId)});

         res.status(200).json({status: true, message: "post deleted"});
    } catch (error) {
        if(error.message == "notAuthenticated")
           res.status(401);
        else
           res.status(200);

        res.send({status:false, message: "not deleted"});
    }
}