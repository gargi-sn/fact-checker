const dbusers = require('../models/dbusers');
const dbposts = require('../models/dbposts');
const dbnotifs = require('../models/dbnotifs');
const dbquery = require('../models/dbquery');
const dbcomments = require('../models/dbcomments')
const mongoose  = require('mongoose');




exports.getUsers = async function(req, res){
    try{
 
        /* console.log(req.cookies.access-token); */

        let query;
        if(req.body.searchType == 'name'){
            query = {
                firstname : req.body.searchValue.split(' ')[0]
            }
        }else if(req.body.searchType == 'email'){
            query = {
                email : req.body.searchValue
            }
        }else if(req.body.searchType == 'date'){
            query = {
                joined: new Date(req.body.saerchValue).toISOString()
            }
        }else if(req.body.searchType == "activities"){
            res.status(400).json({status: false, message: "option not available right now sorry"});
            res.end();
        }else{
            query = {};
        } 
        if(!req.body.isAdmin) 
           throw new Error('notAdmin');

        let profileDetails = await dbusers.find(query).lean().skip(req.body.skip).limit(15);
        if(!profileDetails) throw err;  
        /* res.cookie('access-token', "token" , {expipires: new Date(Date() + 999999),httpOnly: true}) */
        res.status(200).json({status: true, data : profileDetails});
    }catch(err){
        console.log(err);
        if(err.message == "notAdmin")
           res.status(203).json({statu: false, message: "notAuthorized"});
        else
          res.status(404).send({message:"no Data :("});
    }
}

exports.user_update = async function(req, res){
    try{
        delete req.body.userData.email;
        delete req.body.userData.profile_pic;
        if(!req.body.isAdmin)
            throw new Error('notAuthorized');

        const updated = await dbusers.updateOne({_id: req.body.userData._id}, {...req.body.userData});

        if(updated.ok ==1 )
        { 
          const updatedRecord = await dbusers.findOne({_id : req.body.userData._id});
          if(!updatedRecord) throw new Error("notUpdated");
          
          //const RESPONSE_DATA = response_data_builder(updatedRecord);

          res.status(201).json({
             status: 201,
             authenticated:true,
             message:"record updated",
             data: updatedRecord
          })
        }else{
            console.log('error');
            throw new Error('notUpdated');
        }
        
    }catch(err){
        console.log(err);
        let message = err.message;
        if(err.name == "mongoError" || err.name == "validationError")
           res.status(400);
        else if(err.message == "notAuthorized")
           res.status(401);
        else 
           res.status(202)
        
        res.json({
            status:202,
            authenticated:true,
            message:message,
            data : null
        });
    }
}



exports.get_post = async function(req, res){
    try{
        const email = req.body.email;
        if(!req.body.isAdmin) throw new Error("notAuthorized");
        const {searchType, searchValue} = req.body;
        const query = {};
        const filter = {};
        if(searchType == "upvotes")
          filter.upvotesCount = searchValue == "increasing" ? 1 : -1;
        else if(searchType == "downvotes")
          filter.downvotesCounts = searchValue == "increasing" ? 1 : -1;
        else if(searchType == "reports")
          filter.reportsCount = searchValue == "increasing" ? 1 : -1;
        else if(searchType == "date")
          query.time  = {
               $gte : new Date(searchValue)
          }
        else if(searchType == "id")
          query._id = mongoose.Types.ObjectId(searchvalue);
        else if(searchType == "userId")
          query.user_id = mongoose.Types.ObjectId(searchValue);
        else
           console.log("do nothing right now");

        const skip = Number.parseInt(req.params.skip);
        let postData = await dbposts
                             .find(query).populate({path: 'user_id', select:"_id firstname lastname profile_pic"})
                             .select("-date -__v")
                             .lean()
                             .sort(filter)
                             .skip(skip)
                             .limit(8);

       await new Promise((resolve, reject)=>{
           setTimeout(()=>{
               postData.map((indiPost)=>{

                indiPost.time = new Date(indiPost.time).toUTCString();
                indiPost.trueCount = indiPost.trueFlag.length - 1 ;
                indiPost.falseCount = indiPost.fakeFlag.length - 1 ;

                delete indiPost["fakeFlag"];
                delete indiPost["trueFlag"];
                delete indiPost["comments"];
               });
               resolve();
           },0); 
       });

        res.status(200).json({status: true, data: postData});

    }catch(err){
        console.log(err);
        let message = err.message;
        if(err.name == "mongoError" || err.name == "validationError")
           res.status(400);
        else if(err.message == "notAuthorized")
           res.status(401);
        else 
           res.status(202)
        
        res.json({
            status:202,
            message:message,
            data : null
        });
    }
}


exports.removePost = async function(req, res){
    try{
        email = req.body.email;
        isAdmin = req.body.isAdmin;
       
        if(!isAdmin) throw new Error('notAuthorized');
       
        const deleted = dbposts.deleteOne({_id : mongoose.Types.ObjectId(req.params.postId)});



        res.status(200).json({
            status : true,
            message : "deleted",
            data: {
                postId : req.body.postId,
            }
        });
    
        await dbnotifs.newNotif("warning", {post_id: req.params.postId, user_id: req.params.userId, admin_message: "post was deleted by the moderator"});
        
    }catch(err){
        console.log(err);
        let message = err.message;
        if(err.name == "mongoError" || err.name == "validationError")
           res.status(400);
        else if(err.message == "notAuthorized")
           res.status(401);
        else 
           res.status(202)
        
        res.json({
            status: false,
            message:message,
            data : null
        });
    }
}

exports.hide_post = async function(req, res){
    try {
        if(!req.body.isAdmin) throw new Error("notAuthorized")

        const updateFlag = await dbposts.updateOne({_id : mongoose.Types.ObjectId(req.body.postId)}, {hide: true});
        res.status(200).json({status: true, message: "post hidden"});

        dbnotifs.newNotif("warning", {post_id: req.body.postId, user_id: req.body.userId, message: "post was hidden by the moderator"});
    } catch (error) {
        console.log(error);
        if(error.message == "notAuthorized")
         res.status(401);
        else
         res.status(200);
        
         res.json({status: true, message: error.message});
    }
}

exports.unhide_post = async function(req, res){
    try {
        if(!req.body.isAdmin) throw new Error("notAuthorized")

        const updateFlag = await dbposts.updateOne({_id : mongoose.Types.ObjectId(req.body.postId)}, {hide: false});
        res.status(200).json({status: true, message: "post show active"});

        dbnotifs.newNotif("warning", {post_id: req.body.postId, user_id: req.body.userId, message: "post was unhidden by moderator"});
    } catch (error) {
        console.log(error);
        if(error.message == "notAuthorized")
         res.status(401);
        else
         res.status(200);
        
         res.json({status: true, message: error.message});
    }
}


exports.dashboard = async function(req, res){
    try {
        if(!req.body.isAdmin)
          throw new Error("notAuthorized");

        const userCount = await dbusers.countDocuments({});
        const postCount = await dbposts.countDocuments({});
        const commentCount = await dbcomments.countDocuments({});

        res.status(200).json({status:true, data: {
            userCount: userCount,
            postCount : postCount,
            commentCount: commentCount
        }})
    } catch (error) {
        console.log(error);
        if(error.message == "notAuthorized")
          res.status(401).json({status: false, message:"sorry, you are not authorized"});
        else
          res.status(400).json({status: false, message: "inappropriate query"});
    }
}

exports.getQueries = async function(req, res){
    try {
         if(!req.body.isAdmin)
          throw new Error("notAuthorized");
         const skip = req.body.skip;
         const data =  await dbquery.getQuery(skip);
         res.status(200).json({status: true, message: "fetched queries", data: data})
    } catch (error) {
        console.log(error);
        if(error.name == "MongoError" || error.name == "ValidationError")
           res.status(400).json({status: false, message: "bad request", data: null});
        else(error.message == "noData")
           res.status(404).json({status: false, message: "no data found", data: null});
    }
}