const axios = require('axios');
const { JsonWebTokenError } = require('jsonwebtoken');

const getAllMemes = async function(req,res){
    try{
        let options = {
            method : 'get',
            url : `https://api.imgflip.com/get_memes`
        }
        let result = await axios(options);
        res.status(200).send({data: result.data})

    }
    catch(error){
        res.status(500).send({msg:error.message})
    }
}


const myMeme = async function(req,res){
    try{let template_id = req.query.template_id;
    let text0 = req.query.text0;
    let text1 = req.query.text1;
    let options = {
        method : 'post',
        url : `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
    }
    let result = await axios(options);
    res.status(200).send({data : result.data})
} catch(error){
    res.status(500).send({msg: error.message})
}

}
module.exports.getAllMemes = getAllMemes;
module.exports.myMeme = myMeme;