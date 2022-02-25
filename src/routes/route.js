const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})






router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})
let players=[]
router.post('/players', function(req, res){
    
    let player= req.body
    let playerName = players.name
    for(let i=0;i<players.length;i++)
    {
        if(players[i].name == playerName)
        {
           return  req.send('players not exits')
        }
    }
    players.push(player)
    console.log('here is the player from requst',players)
    res.send(players)
})
router.post('players/:playerName/booking/:bookingId', function(req, res){
    let name= req.params.playerName
    
    let isplayerPresent= false
    for(let i=0;i<players.length;i++)
    {
          if(players[i].name== name)
          {
        isplayerPresent= true
          }
    }
       if(!isplayerPersent)
       {
          return res.send('player not present')
       }

        let booking= req.body
        let bookingId= req.params.bookingId
          for(let i=0;i<players.length;i++)
          {
                 let isbbookingPresent= false
                 for(let j=0;j<players[i].booking.length)
                 {
                     console.log(players[i])
                     if(players[i].booking[j])
                     {
                         res.send('booking is already present')
                     }
                 }
              players[i].bookings.push(booking)
          }
      res.send(players)
})





router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})

module.exports = router;