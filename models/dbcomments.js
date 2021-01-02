const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');



let CommentSchema = new schema({
    post_id : {type: mongoose.Schema.Types.ObjectId, required: true},
    user_id : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    content : {type: String, required: true},
    time    : {type: Date},
    date    : {type: Date},
    upvotes : [{type: String, ref: 'User'}],
    downvotes : [{type: String, ref: 'User'}],
    Reports : [{type: String, ref: 'User'}],
    upvotesCount: Number,
    downvotesCount : Number,
    reportsCount : Number    
});


CommentSchema.pre('save', function(next) {
    try{
        const comment = this;
        const current_date = new Date().toISOString();
        comment.time = current_date;
        comment.date = current_date;
        next();
    }catch(e){
        next(e);
    }
  });

let CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;