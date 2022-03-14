const express = require('express');
const router = express.Router();
const controller= require("../controllers/controller")
const auth = require('../middleware/auth')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", controller.createUser  )

router.post("/login", controller.userLogin)

//The userId is sent by front end
router.get("/users/:userId",auth.authenticate, auth.authorise,controller.getUserData)

router.put("/users/:userId", auth.authenticate, auth.authorise,controller.updatedUser)

router.delete('/users/:userId', auth.authenticate,auth.authorise, controller.deleteUser)

module.exports = router;