const jwt = require("jsonwebtoken");

const tokenCheck = async function(req,res,next){
    let token = req.headers["x-Auth-token"];
    if(!token)  token = req.headers["x-auth-token"];
    if(!token) return res.send({status:false, Warning :"token must be present"})

    let decodedToken = await jwt.verify(token, "SECRET MESSAGE")
    if(!decodedToken) return res.send({status : false, warning : "Invalid Token"})

    next()
}

module.exports.tokenCheck = tokenCheck;