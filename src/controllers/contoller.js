const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function(req,res){
    let data = req.body;
    let savedData = await userModel.create(data);
    res.send({newUser:savedData})
}

const loginUser = async function(req,res){
    let emailId = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({emailId:emailId, password:password})
    if(!user) return res.send({status: false, Warning : "Email ID or password is incorrect"})
    
    let token = jwt.sign({userId:user._id.toString()}, "SECRET MESSAGE")
    res.send({status : true, token : token});

}

const getUserData = async function(req,res){
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    if(!user) return res.send({status : false, warning: "Invalid UserId"})

    res.send({status:true, data : user})
}

const updateUser = async function(req,res){
    let updateDetails = req.body;
    let userId = req.params.userId;
    let updatedUser = await userModel.findOneAndUpdate({_id:userId},updateDetails,{new: true})
    res.send({status: true, msg: updatedUser})
}

const deleteUser = async function(req,res){
    let userId = req.params.userId;
    let updatedUser = await userModel.findOneAndUpdate({_id:userId},{$set: {isDeleted : true}},{new:true})
    res.send({status: true, msg:updatedUser})
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;