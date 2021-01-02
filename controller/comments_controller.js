const dbusers = require('../models/dbusers.js');
const dbposts = require('../models/dbposts.js');
const dbcomments = require('../models/dbcomments.js');
const dbnotifs = require('../models/dbnotifs');
const config = require('../config/config');
const mongoose = require('mongoose');


/* 
 * using email for upvotes and donwvotes both in posts and comments 
 * use the database field of upvoteCount and downvote count instead of looping and application side implementation
 * both in comments controller and posts controller.
 * 
 */

exports.getComments = async function(req, res){
    try{
        const email = req.body.email;
        const {post_id , skip} = req.body;
        if(!post_id && !skip)
           throw new Error("DataMalformed");
        
        const comments = await dbcomments.find({post_id: mongoose.Types.ObjectId(post_id)}).populate({path: 'user_id', select: "_id firstname lastname profile_pic"}).lean().sort({time: -1}).skip(skip).limit(8);
        await new Promise((res, rej)=>{
         setTimeout(()=>{
            for(let comment of comments){
                if(comment.upvotes.indexOf(email) >= 0 || comment.downvotes.indexOf(email)>= 0){
                    comment.voted = comment.upvotes.indexOf(email)>=0? "upvote" : "downvote";
                }
                comment.upvotes = comment.upvotes.length;
                comment.downvotes = comment.downvotes.length;
            }
            res();
         }, 0);
       });
        res.status(200).json({status:true, data: comments});
    }catch(e){
       console.log(e);
       res.status(200).json({status: false, data: null});
    }
}


exports.getCommentsForSingleUser = async function(req, res){
    try{
        console.log(req.body);
        const email = req.body.email;
        const {user_id , skip} = req.body;
        if(!user_id && !skip)
           throw new Error("DataMalformed");
        
        const comments = await dbcomments.find({user_id: mongoose.Types.ObjectId(user_id)}).populate({path: 'user_id', select: "_id firstname lastname profile_pic"}).lean().sort({time: -1}).skip(skip).limit(8);
        await new Promise((res, rej)=>{
         setTimeout(()=>{
            for(let comment of comments){
                if(comment.upvotes.indexOf(email) >= 0 || comment.downvotes.indexOf(email)>= 0){
                    comment.voted = comment.upvotes.indexOf(email)>=0? "upvote" : "downvote";
                }
            }
            res();
         }, 0);
       });

        res.status(200).json({status:true, data: comments});
    }catch(e){
       console.log(e);
       res.status(200).json({status: false, data: null});
    }
}

exports.submitComment = async function(req, res){
    try{ 

        if(!req.body.email)
           throw new Error("notAuthenticated");

        const {post_id, user_id, content, post_user_id} = req.body;
        if(!post_id || !user_id || !content)
           throw new Error("dataMalformed");

        const comment = new dbcomments({
            post_id : post_id,
            user_id : user_id,
            content : content,
            upvotesCount: 0,
            downvotesCount: 0,
            reportsCount: 0
        });

        await comment.save(async (err)=>{
            if(err)
              throw new Error(err);
            else{ 
               const updateFlag = await dbposts.updateOne({_id : post_id}, {$push: {comments: comment}, $inc: {commentsCount: 1}});
               if(updateFlag.nModified > 0){
                   res.status(201).json({
                       status: true,
                       message: "comment added",
                       data: {
                           _id: comment._id,
                           user_id : user_id,
                           post_id : post_id,
                           content : content,
                           time : new Date().toISOString(),  
                           upvotes : 0,
                           downvotes : 0
                       }
                   })
               }
            }
            
        });

        dbnotifs.newNotif("commented", {user_id: post_user_id, reactor_id: user_id, post_id: post_id, content: content});
    }catch(e){
        console.log(e);
        res.status(400).json({
            status: false, 
            data: null
        });
    }
}



exports.upvoteComment = async function(req, res){
    try {
        const email = req.body.email;
        if(!email)
            throw new Error("notAuthenticated");
        
        const commentId = req.body.comment_id
        if(!commentId)
          throw new Error("insufficent request parameters");
        
        if(req.body.voted == 'downvote' || req.body.voted == undefined){
           const updateFlag = await dbcomments.updateOne({_id: mongoose.Types.ObjectId(commentId)},{$push : {upvotes : email},$pull : {downvotes : email}, $inc: {upvotesCount: 1, downvotesCount: -1}});
           res.status(200).json({status: true, message: "upvoted"});
        }
        else{
           const updateFlag = await dbcomments.updateOne({_id: mongoose.Types.ObjectId(commentId)},{$pull : {upvotes : email}, $inc:{upvotesCount: -1}});
            res.status(200).json({status: true, message: "upvoteRemoved"});
        }
                         
    } catch (error) {
        console.log(error.message);
        if(error.name == "MongoError" || error.name == "validationError")
           res.status(400).json({status: false, message: "wrong Input"});
        else
           res.status(200).json({status: false, message:"Error Occured"});
    }
} 

exports.downvoteComment = async function(req, res){
    

try {   
        const email = req.body.email;
        if(!email)
            throw new Error("notAuthenticated");
        
        const commentId = req.body.comment_id
        if(!commentId)
          throw new Error("insufficent request parameters");
        if(req.body.voted == 'upvote' || req.body.voted == undefined){
            const updateFlag = await dbcomments.updateOne({_id: mongoose.Types.ObjectId(commentId)},{$push : {downvotes : email},$pull : {upvotes : email}, $inc: {upvotesCount: -1, downvotesCount: 1}});
            res.status(200).json({status: true, message: "downvoted"});
        }else{
            
            const updateFlag = await dbcomments.updateOne({_id: mongoose.Types.ObjectId(commentId)},{$pull : {downvotes : email}, $inc:{downvotesCount: -1}});
            res.status(200).json({status: true, message:"downvoteRemoved"});
        } 
        
    } catch (error) {
        console.log(error);
        if(error.name == "MongoError" || error.name == "validationError")
           res.status(400).json({status: false, message: "wrong Input"});
        else
           res.status(200).json({status: false, message:"Error Occured"});
    }
} 


exports.deleteComment = async function(req, res){
    try { 
          const email = req.body.email;
          if(!email)
            throw new Error("notAuthenticated");
          const comment_id = req.body.comment_id;
         // const user_id = user_id;

          const deleteFlag = await dbcomments.deleteOne({comment_id : mongoose.Types.ObjectId(comment_id)});

          res.status(200).json({status: true, message: "deleted comment", comment_id : comment_id});
    } catch (error) {
        console.log(error);
        if(error.name == "mongoError")
          res.status(500);
        else if(error.message == "notAuthenticated")
          res.status(401);
        else
          res.status(200);

        res.json({status: false, message: "comment not deleted"});
    }
}