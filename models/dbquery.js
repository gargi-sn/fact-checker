
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const querySchema = new schema({
    name: String,
    email: {type: String, required:true, validate: /[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+/},
    query: String,
    time: Date 
});

querySchema.statics.submitQuery = async function(data){
    try {
         if(!(data.name && data.email && data.query))
           throw new SyntaxError('InvalidParameters');
        
         const newQuery  = new queryModel({
             name: data.name,
             email: data.email,
             query: data.query,
             time: new Date(Date.now())
         });

         await newQuery.save();
         
    } catch (error) {
      throw error
    }
}


querySchema.statics.getQuery = async function(skip){
    try {
          const queries = await this.model('queries').find({}).sort({time: -1}).skip(skip).limit(15);
          if(!queries.length)
            throw new Error('noData');
          
          return queries;
    } catch (error) {
         throw error;
    }
}

const queryModel = mongoose.model('queries', querySchema);
module.exports = queryModel;