const headerCheck = async function(req,res,next){
    let check = req.headers.isfreeappuser;
    if(check) {
        next()
    }
    else{
        res.send({Warning: "Mandatory heading is not present."})
    }
}

module.exports.headerCheck = headerCheck;