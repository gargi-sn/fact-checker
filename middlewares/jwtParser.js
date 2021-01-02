const jwt = require('jsonwebtoken');

exports.jwtParse = async function(req, res, next){
    try{
        let token = "";
        if(req.route.methods.get)
          token = req.params.token;
        else if(req.headers.authorization)
          token = req.headers.authorization;
        else
          token = req.body.token;

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.email = decode.email;
        req.body.isAdmin = decode.isAdmin;
        req.body.userId = decode.userId? decode.userId : null;
        next();

    }catch(e){
        req.body.email = null;
        next();
    }
}