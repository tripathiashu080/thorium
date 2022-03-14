const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authentication = async function(req,res,next){
    let token = req.headers["x-Auth-token"];
    if(!token)  token = req.headers["x-auth-token"];
    if(!token) return res.send({status:false, Warning :"token must be present"})

    let decodedToken = jwt.verify(token, "SECRET MESSAGE")
    if(!decodedToken) return res.send({status : false, warning : "Invalid Token"})

    next()
}

const authorisation = async function(req,res,next){
    let decodedToken = jwt.verify(req.headers["x-auth-token"],"SECRET MESSAGE");
    if(decodedToken.userId != req.params.userId) return res.send({Warning: "You are not allowed to make changes in this data"})
    next()
}

module.exports.authentication = authentication;
module.exports.authorisation = authorisation;