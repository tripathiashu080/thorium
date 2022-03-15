const blogModel= require('../models/blogModel.js');
const authorModel= require('../models/authorModel.js')

const blog= async function(req,res){
    try{
        const blogDetails= req.body
        const id=req.body.authorId
        const validate= await authorModel.findById(id)
        if(!validate) return res.status(400).send({error: "invalid authorid"})
        const data = await blogModel.create(blogDetails)
        console.log("data save sucessfully")
        res.status(201).send({msg:data,status:true})
    }
    catch(error){res.status(500).send({status:false,msg: error.Massage})}
}

const getblogs= async function(req,res){
    try{
       let  qwery= req.query
       let filter={
           isDeleted:false,
           isPublished:true,
           ...qwery
       };
       const filterByQuery= await blogModel.find(filter)
       if(filterByQuery.length==0){
           return res.status(404).send({status:true,msg:"no blog found"})
       }
       console.log("data fetched successfully")
      return res.status(201).send({status:true,data:filterByQuery})
    }
    catch(error){res.status(500).send({status:false,msg:error.Massage})}
}

const editblog= async function(req,res){
    const blogId= req.params.blogId
     const Details= req.body
    const validId= await blogModel.findById(blogId)
    if(!validId){
        return res.status(400).send({status:false,msg:"blog id invalid"})
    }
    const updatedDetails= await blogModel.findOneAndUpdate(
        {id: blogId},
        {title:Details.title,body:Details.body,tags:Details.tags,subcategory:Details.subcategory,publishedAt:new Date()},
        {new :true,upsert:true})
        res.send({status:true,data:updatedDetails})
}
    
const deleteBlogById = async function(req,res){
    const blogId=req.params.blogId
    const validId = await blogModel.findById(blogId)
    if(!validId){
        return res.status(400).send({status:false,msg:"blog Id invalid"})
    }
    const deletedDetails= await blogModel.findOneAndUpdate(
        {filter},
        {isDeleted:true},
        {new: true})
        res.send({status:true,data:deletedDetails})
}

    const deletedBlogByQuery= async function(req,res){
        let qwery=req.query
        let filter= {...qwery}
        const filterByQuery= await blogModel.find(filter)
        if(filterByQuery.length==0){
            return res.status(404).send({satus:true,msg:"no blog found"})
        }
        const deletedDetails= await blogModel.findOneAndUpdate(
            filter,
            {isDeleted:true},
            {new:true})
            res.send({status:true,data:deletedDetails})
    }

module.exports.blog=blog
module.exports.getblogs=getblogs
module.exports.editblog = editblog
module.exports.deleteBlogById=deleteBlogById
module.exports.deletedBlogByQuery= deletedBlogByQuery