const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')
const mw = require("../middleware/middleware")


//1 creating User
router.post('/createUser', mw.headerCheck, controller.createUser)

//2 creating Product
router.post('/createProduct',controller.createProduct)

//3 creating order
router.post('/createOrder',mw.headerCheck, controller.createOrder)


module.exports = router;