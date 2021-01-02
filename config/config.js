module.exports = {
    PORT : 4000,
    HOST : "http://localhost:4000/", 
    MONGO_URL : process.env.MONGO_URL,
    DB_NAME   : process.env.DB_NAME,
    production : function(){
        this.PORT = 80;
        this.MONGO_URL = "";
    }
}