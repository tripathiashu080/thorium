const express = require('express');
const router = express.Router();
const controller= require("../controllers/controller")
const middleware = require('../middleware/middleware')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", controller.createUser  )

router.post("/login", controller.loginUser)

//The userId is sent by front end
router.get("/users/:userId",middleware.tokenCheck, controller.getUserData)

router.put("/users/:userId", middleware.tokenCheck, controller.updateUser)

router.delete('/users/:userId',middleware.tokenCheck, controller.deleteUser)

module.exports = router;