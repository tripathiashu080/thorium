const authorModel = require('../models/authorModel.js');

const author = async function (req, res){
    try{
    const authorDetails = req.body
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      if (!validateEmail){
          return res.stutus(400).send({msg : "email invalid"})
      }
      const data = await authorModel.create(authorDetails)
      console.log("data saved successfully")
      res.status(200).send({msg : data})  
    }
    catch(error){ res.status(500).send({error : error.message})}               
}

module.exports.author = author