const express = require("express");
const router = express.Router();
const db = require("../db/queries.js");


/////////////////////////////////USER ROUTES

router.post('/users', function (req, res, next) {
    console.log(req.body);
    let data;
    db.checkUserExists(req.body.username)
    .then(function(users, err){
        if(users[0].count > 0){
            res.send('username already exists')
        } else{
            db.addUser(req.body)
            .then(function(users){
                res.send('User Created')            
            })
            .catch(function(error) {
                next(error);
            })
        }
    })
    .catch(function(error){
        next(error);
    });

})

router.get('/users', function (req, res, next){
    db.getAllUsers()
    .then(function(users){
        res.status(200).json(users);
    })
    .catch(function(error){
        next(error);
    });
})

/////////////////////////////////HABIT ROUTES

router.get("/allHabits/:id", function(req, res, next){
    db.getAllHabits(req.params.id)
    .then((habits) => {
        res.status(200).json(habits);
    }).catch((error) => {
        next(error);
    })
})
module.exports = router;