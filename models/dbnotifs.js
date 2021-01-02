const mongoose = require('mongoose');
const schema = mongoose.Schema;


const notifSchema = new schema({
    user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    message : String,
    reactor_id : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    time : Date,
    seen : Boolean
});

notifSchema.pre('save', (next)=>{
    try {
         this.time  = new Date(Date.now());
         next()
    } catch (error) {
        next(error);
    }
});

notifSchema.statics.findNotifsbyUserId = async function(user_id){
    try {
         const data = await this.model('notifs').find({user_id: user_id}).populate({path: 'reactor_id', select:"_id firstname lastname profile_pic"})
         .sort({time: -1})
         .limit(15);
         return data
    } catch (error) {
         console.log(error)
    }
}

notifSchema.statics.newNotif = function(notif_type, dataObject){
    return new Promise((res, rej)=>{
        setTimeout(async()=>{
        try {
            let message = "";
            let notif = null;
            if(notif_type == "reacted-fake"){
    
                const {user_id, post_id, reactor_id} = dataObject;
                if(!(user_id && post_id && reactor_id)) throw new SyntaxError("invalidParameters")
                message = "reacted fake"
                let time = new Date(Date.now());
                notif = new notifModel({user_id: mongoose.Types.ObjectId(user_id), 
                    post_id: mongoose.Types.ObjectId(post_id), 
                    reactor_id: mongoose.Types.ObjectId(reactor_id), 
                    time:time, 
                    message:message
                });
    
            } else if(notif_type == "reacted-true"){
    
                const {user_id, post_id, reactor_id} = dataObject;
                if(!(user_id && post_id && reactor_id)) throw new SyntaxError("invalidParameters")
                message = "reacted true"
                let time = new Date(Date.now());
                notif = new notifModel({user_id: mongoose.Types.ObjectId(user_id), 
                    post_id: mongoose.Types.ObjectId(post_id), 
                    reactor_id: mongoose.Types.ObjectId(reactor_id), 
                    time:time, 
                    message:message
                });
    
            } else if(notif_type == "commented"){
    
                const {user_id, post_id, reactor_id, content} = dataObject;
                if(!(user_id && post_id && reactor_id)) throw new SyntaxError("invalidParameters")
                message = "commented  " + content;
                let time = new Date(Date.now());
                notif = new notifModel({user_id: mongoose.Types.ObjectId(user_id), 
                    post_id: mongoose.Types.ObjectId(post_id), 
                    reactor_id: mongoose.Types.ObjectId(reactor_id), 
                    time:time, 
                    message:message
                });
    
            } else if(notif_type == "warning") {
    
                const {user_id, post_id, admin_message} = dataObject;
                if(!(user_id && post_id && admin_message)) throw new SyntaxError("invalidParameters")
                message = admin_message;
                let time = new Date(Date.now());
                notif = new notifModel({user_id: mongoose.Types.ObjectId(user_id),
                     post_id: mongoose.Types.ObjectId(post_id), 
                     time:time, 
                     message:message
                    });
               
            } else {
                throw new SyntaxError("unknownTypeOfReaction")
            }
    
            await notif.save();
            res();
        } catch (error) {
           rej(error);
        }
     }, 0);
   }).catch(error=> {console.log(error)});
}


const notifModel = mongoose.model('notifs', notifSchema);
module.exports = notifModel;