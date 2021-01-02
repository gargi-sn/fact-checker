require('dotenv').config();
const config = require('./config/config');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const dbusers = require('./models/dbusers');


class SendMailClass{

  constructor(){
    
    this.connection = mongoose.connection;
    this.emailBody = null;
    this.emails = null;
  }

  async buildContent(){
    this.emailBody = "<h2><center> Hello FactChecker <center><h2><h3>These are some of the fake news busters of this week</h3><a href='http://localhost:4200/#/news?date=" + new Date(Date.now()).toISOString() + ">click here to check</a>";
    this.emails = await dbusers.find({}).select("email");
  }
  
  async sendToAllEmails(){
    for(let i = 0; i< this.emails.length; i++){
      setTimeout(()=> this.sendMail("factcheckers@gmail.com", this.emails[i].email, "updates", this.emailBody), 0);
    }
  }

  async sendMail(from, to, subject,  htmlmsg){
  /*
   * takes from to subject and html tagged content to be sent via email.
   */
    let transporter=nodemailer.createTransport(
        {
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:
            {
             
              user: process.env.user,
              pass : process.env.pass
    
            }
        }
      );
    let mailOptions=
    {
       from:from ,
       to:to,
       subject:subject,
       html:htmlmsg
    };
  
    transporter.sendMail(mailOptions ,function(error,info)
    {
      if(error)
      {
        console.log(error);
      }
      else
      {  
        console.log('Email sent:'+info.response);
      }
    });
 }
}

const MONGO_URL = config.MONGO_URL;
const db = config.DB_NAME; 
mongoose.connect(MONGO_URL + db, {useUnifiedTopology: true, useNewUrlParser:true}, async()=>{
    const emailObj = new SendMailClass();
    await emailObj.buildContent();
    await emailObj.sendToAllEmails();
});

