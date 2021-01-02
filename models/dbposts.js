const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');


let CommentSchema = new schema({
    post_id : mongoose.Schema.Types.ObjectId,
    user_id : mongoose.Schema.Types.ObjectId,
    content : {type: String, required: true},
    time    : {type: Date},
    date    : {type: Date},
    upvotes : Number,
    downvotes : Number,
    Reports : Number    
});

let PostSchema = new schema({
    //post_highlight : {type: [], required: true, trim:true},
    content   : {type: [], required: true, trim:true},
    time      : {type:Date},
    date      : {type:Date},
    user_id   : {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
    trueFlag  : [],
    fakeFlag  : [], 
    reports   : [],
    hide      : Boolean,
    upvotesCount: Number,
    downvotesCount : Number,
    reportsCount : Number,
    newsMedium: {type: String, required: true},
    comments  : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    commentsCount: Number
});


PostSchema.pre('save', function(next) {
    try{
        const post = this;
        const current_date = new Date();
        post.time = current_date;
       //let date = current_date.getFullYear() + "-" + (current_date.getMonth() + 1) + "-" + current_date.getDate() + 'T00:00:000Z';
        post.date = current_date;
        next();
    }catch(e){
        console.log(e);
        next(e);
    }
  });

let PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;



