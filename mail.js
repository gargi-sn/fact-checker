var nodemailer = require('nodemailer');

exports.buildPasswordChangeLink = function(newHash){
  let emailBody = `<h2><center> Hello FactChecker <center></h2><h3Please click on the link below to change your password</h3>
  <a href='${process.env.frontend}#/change-forgotten-password?hash=${newHash}'>click here to change password</a>`;  
  return emailBody; 
}

exports.buildLink = function(hash){
    var emailBody = "<h2><center> Hello FactChecker <center></h2><h3>Please click on the link below to verify your account</h3>";
    emailBody = emailBody + "<a href='" + process.env.frontend + "#/verify-account?hash=" + hash + "'>click here to verify</a>";
    return emailBody;
}

exports.sendMail = async function(from, to, subject,  htmlmsg){
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
             
              user:process.env.user,
              pass:process.env.pass
    
            }
        }
      );
    console.log(transporter);
    let mailOptions=
    {
       from:from ,
       to:to,
       subject:subject,
       html:htmlmsg
    };
    try{
      const info = await transporter.sendMail(mailOptions);
      if(info){
       emailFlag = 1;
       console.log('Email sent:'+info.response);
      }
    }catch(error){
      emailFlag = 0;
      throw error
    }
}