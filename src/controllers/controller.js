const { count } = require("console")
const userModel= require("../models/userModel")
const productModel = require("../models/productModel")
const orderModel = require('../models/orderModel')

const createUser = async function(req,res){
    let data = req.body;
    let savedData = await userModel.create(data);
    res.send({User:savedData})
}

const createProduct = async function(req,res){
    let data = req.body;
    let savedData = await productModel.create(data);
    res.send({product:savedData})
}

const createOrder = async function(req,res){
    let data = req.body;
    let userId = data.userId;
    let productId = data.productId;

    if(!userId){
        return res.send({Warning: "Use Id must be present"})
    }

    let user = await userModel.findById(userId);
    if(!user){
        return res.send({Warning: "Invalid User ID"})
    }
    if(!productId){
        return res.send({Warning : "Product Id must be present"})
    }
    let product = await productModel.findById(productId)
    if(!product){
        return res.send({warning : "Invalid product ID"})
    }
    let savedData = await orderModel.create(data);
    let ID = savedData._id

    let bool = req.headers.isfreeappuser;
    if(bool == "true"){
        let updated = await orderModel.updateOne(
            {_id : ID},
            {$set : { amount : 0, isFreeAppUser:true}},
            {new : true}
        )
    }
    else{
        let product = await productModel.findById(productId)
        let user = await userModel.findById(userId);
        if(product.price<user.balance){
            let newUpdated = await userModel.updateOne(
                {_id : userId},
                {$inc:{balance : -product.price}},
                {new : true}
            )
            let newUpdate = await orderModel.updateOne(
                {_id : ID},
                {$set : {isFreeAppUser:false}},
                {new : true} 
            )
        }
        else if (product.price>user.balance){
            res.send({Warning : "Unsufficient Balance"})
        }
    }
    return res.send({Order : savedData})
}

module.exports.createUser = createUser;
module.exports.createProduct = createProduct;
module.exports.createOrder = createOrder;