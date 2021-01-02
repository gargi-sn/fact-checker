const dbusers = require('../models/dbusers');
const dbnotifs = require('../models/dbnotifs');
const dbquery = require('../models/dbquery');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const mailer = require("../mail");

function response_data_builder(record){
    return {
        "profile_pic":record.profile_pic?config.HOST + record.profile_pic : null, 
        "firstname":record.firstname, 
        "lastname":record.lastname, 
        "email":record.email,
        "address": record.address? record.address: "",
        "user_id" : record._id,
        "state"  : record.state,
        "joined" : record.joined? record.joined : "" 
    }
}


/* login code using credentials */
  exports.login = async function(req,res){
         try{
          let searchValue = await dbusers.findOne({email:(req.body.email).toLowerCase()});
  
          if(!searchValue)
             throw new Error("notAvailable");
          
          //if(!searchValue.verified)
             //throw new Error("notVerified");
          
          bcrypt.compare(req.body.password, searchValue.password ,async (err)=>{
                if(err) throw err;
  
              /***** jwt token  *****/
                const payload = {
                    email: searchValue.email,
                    isAdmin : searchValue.isAdmin,
                    userId : searchValue._id
                };
                const options = { expiresIn: '2d', issuer: config.HOST };
                const secret = process.env.JWT_SECRET;
                const token = await jwt.sign(payload, secret, options);
                /***** jwt created ******/
                
  
              const RESPONSE_DATA = response_data_builder(searchValue); 
              res.status(202).json({
                  status:202,
                  message:"authenticated",
                  token: token,
                  isAdmin:searchValue.isAdmin,
                  data : RESPONSE_DATA
              });
          });
         
      }catch(error){
          let message = null;
          console.log(error);
          if(error.message == "notAvailable"){
              res.status(400)
              message = "user is not available please sign-up";
          }
          if(error.message == "notVerified"){
              res.status(200);
              message = "you're not verified yet please check your mail";
          }
          res.json({status:false, message:message});
      }
  }    
/* login ends */

exports.verify_user = async function(req, res){
    try {
         await dbusers.updateOne({hash : req.params.hash}, {verified : true, hash:""});
         res.status(200).json({status: true, message:"verified"});
    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, message:"couldn't verify"});
    }
}
  
/* sign up code starts */
  exports.signup = async function(req, res){
     try{
       let hash = await crypto.randomBytes(16).toString('hex'); 
       let newUser = new dbusers({
          firstname : req.body.firstname,
          lastname  : req.body.lastname,
          email     : (req.body.email).toLowerCase(),
          password  : req.body.password,
          hash      : hash,
          verified : false,
          isAdmin   : false
      });
      newUser.save((err)=>{
          if(err){
              console.log(err);
          }else{ 
           res.status(201).json({status:201, message:"data saved"});
          }  
      });
      
      setTimeout(()=>{
          const emailBody = mailer.buildLink(hash);
          mailer.sendMail("support@factcheckzz.com", req.body.email , "account activation", emailBody);
      },0);
     }catch(err){
         console.log(err);
         res.status(403).json({status:403, message:"couldn't create an account"});
     }
      
  }
/* sign up code ends */
  
/* profile code starts */
  exports.profile = async function(req, res){
      try{
          /* console.log(req.cookies.access-token); */
          let profileDetails = await dbusers.findOne({email:req.body.email});
          if(!profileDetails) throw err;  
          /* res.cookie('access-token', "token" , {expipires: new Date(Date() + 999999),httpOnly: true}) */
          res.status(200).json(profileDetails);
      }catch{
          res.status(404).send({message:"no Data :("});
      }
  }
/* profile code ends */

  
/* profile update code starts */
  exports.profile_update = async function(req, res){
      try{
          const { token } = req.body;
          const decode = await jwt.verify(token, process.env.JWT_SECRET);
          delete req.body.email;
          delete req.body.profile_pic;
          const updated = await dbusers.updateOne({email:decode.email}, {...req.body});

          if(updated.ok ==1 )
          { 
            const updatedRecord = await dbusers.findOne({email: decode.email});
            if(!updatedRecord) throw new Error("Problem in finding Record");
            
            const RESPONSE_DATA = response_data_builder(updatedRecord);

            res.status(201).json({
               status: 201,
               authenticated:true,
               message:"record updated",
               data: RESPONSE_DATA
            })
          }else{
              throw new Error('i think i am losing my mind');
          }
          
      }catch(err){
          if(err.name == "mongoError" || err.name == "validationError")
             res.status(400);
          else 
          res.status(202)
          
          res.json({
              status:202,
              authenticated:true,
              message:"couldn't update the record",
              data : null
          })
      }
  }
/* profile update code ends */ 
  
  
  
  exports.strike = function(req, res){
      /* reporting code */ 
  }
  
  
/* login using jwt token code starts */
  exports.login_with_token = async function(req, res){
      try{
          if(req.body.hasOwnProperty('token')){
            const decode = await jwt.verify(req.body.token, process.env.JWT_SECRET);
  
            let searchValue = await dbusers.findOne({email:decode.email});
  
            if(!searchValue) throw err;
            
             const RESPONSE_DATA = response_data_builder(searchValue);

            res.status(200).json({status:200, message: "authenticated", isAdmin:searchValue.isAdmin, token: req.body.token, data : RESPONSE_DATA});
  
          }
      }catch(err){
          if(err.name == "TokenExpiredError")
            res.status(203).json({status: 203, message:"notAuthenticated"});
          else
            res.status(200).json({status:true, message:"ErrorLogin"});
      }
  }

/* login using jwt token ends */


/* profile pic upload starts */

    exports.profile_pic = async function(req, res){
        try{ 
            const { token } = req.body;
            const FILE_PATH = req.file.path.split("static\\")[1];
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            const searchValue = await dbusers.updateOne({email:decode.email}, {profile_pic:FILE_PATH});
            if(!searchValue) throw err
    
            res.status(201).json({
                "status" : 201,
                "authenticated" : true,
                "message"  : "profile pic was saved", 
                "data" : {
                    "profile_pic_path": config.HOST + FILE_PATH
                }
            });
            
        }catch(err){ 
            console.error(err)
            res.status(202).json({
                "status" : 202,
                "authenticated" : true,
                "message"  : "profile pic was not saved", 
                data : {
                    "profile_pic_path": null
                }
            });
        } 
    }

/* profile pic upload ends */



exports.fetch_notifications = async function(req, res){ 
    try {
          if(!req.body.email)
           throw new Error("notAuthenticated");
           
          const user = await dbusers.findOne({email: req.body.email});
          const data = await dbnotifs.findNotifsbyUserId(user._id)
                                     
            
          res.status(200).json({status: true, data: data, message:"fetched latest notifications"});
    } catch (error) {
        console.log(error);
        if(error.message == "notAuthenticated")
          res.status(401);
        
        res.json({status: false, message: "couldn't fetch notifications"});
    }
}


exports.view_user = async function(req, res){
    try {
        const userData = await dbusers.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}).select("_id firstname lastname profile_pic state");
        if(!userData)
          throw new Error("notFound"); 
        
        res.status(200).json({status: true, data: userData, message:"found"})
    } catch (error) {
        console.log(error);
        if(error.message == "notFound")
          res.status(404).json({status: false, message:"user not found", data: null});
        else
          res.status(400).json({statu:false, message: "bad input", data:null})
    }
}



exports.sub_query = async function(req, res){
    try {

        await dbquery.submitQuery(req.body);
        res.status(200).json({
            status: true,
            message: "query submitted"
        });
    } catch (error) {
        console.log(error);
        if(error.message == "InvalidParameters")
          res.status(400).json({
              status: false,
              message: "some parameter is missing"
          });
        if(error.name == "ValidationError" || error.name == "MongoError")
         res.status(400).json({
             status: false,
             message: "please enter valid email"
         })
    }
}


exports.forgotPassword = async function(req, res){
    try {
        const email = (req.body.email).toLowerCase();
        const newHash = await bcrypt.hash(email, 10);
        const data = await dbusers.findOneAndUpdate({email: email}, {$set: {hash: newHash}}, {returnOriginal: false});
        if(data){
            const emailBody = mailer.buildPasswordChangeLink(newHash);
            await mailer.sendMail("support@factcheckzz.com", email , "reset password", emailBody);
            res.status(200).json({status: true, message:"reset password link sent to your email"})
        }else
          throw new Error("NoData");
    } catch (error) {
        console.log(error);
        if(error.name == "MongoError" || error.name == "ValidationError")
          res.status(400).json({status: false, message: "sorry data couldn't be processed right now"});
        else if(error.message == "NoData")
          res.status(404).json({status: false, message: "sorry no data present for this email"});
        else 
          res.status(500).json({status: false, message: "sorry some error occured please try again later"});
          
    }
}

exports.changeForgottenPassword = async function(req, res){
    try {
          const newPassword = req.body.password.length>8 && req.body.password.length<15?req.body.password : null;
          if(newPassword === null)
            throw new SyntaxError("InvalidPassword");
          const data = await dbusers.updateOne({hash : req.body.hash}, {$set: {password: newPassword}});
          res.status(200).json({status: true, message: "password changed"});
    } catch (error) {
          console.log(error);
          if(error.name== "MongoError" || error.name == "ValidationError")
            res.status(400).json({status: false, message: "wrong input"});
          else if(error.message == "InvalidPassword")
            res.status(400).json({status:false, message: "please enter valid password"});
          else
            res.status(500).json({status: false, message: "sorry some error occured please try again later"});
    }
}
