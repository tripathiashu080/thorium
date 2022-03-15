const jwt = require('jsonwebtoken');

let authentication = async function(req,res,next){
    try{
        let token= req.headers['x-api-key']
        if(!token){
            return res.status(400).send({msg:"token must be present"})
        }
        next()
    }
    catch(errorFound) {res.status(500).send({error: errorFound.Massage})}
}
module.exports.authenticate = authentication