const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const weatherController = require('../controllers/weatherController')
const memeController = require('../controllers/memeController')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// Cowin APIs
router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)
router.get('/cowin/vsbydId', CowinController.getDistrictsById)
router.get('/certificateDownload',CowinController.certificateDownload)


// Weather APIs

router.get('/weatherByCity', weatherController.getCityWeather )
router.get('/sortCitiesByTemp', weatherController.getCitiesSorted)


// meme APIs

router.get('/getAllMemes', memeController.getAllMemes);
router.post('/myMeme', memeController.myMeme);


// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;