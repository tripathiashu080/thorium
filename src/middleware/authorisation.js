const jwt = require('jsonwebtoken');

let authorization = async function(req,res,next){
    try{
        let token = req.headers['x-api-key']
        let decodedToken = jwt.verify(token,"projects for blogs")
        let usedLoggedIn = decodedToken.authorId
        let param_Id =req.params.authorId
        if(usedLoggedIn !== param_Id) return res.status(401).send(" you are not authorised to access")
        next()
    }
    catch(errorFound) {res.status(500).send({error: errorFound.Massage})}
}
module.exports.authorize= authorization