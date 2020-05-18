const express = require("express");
const router = express.Router();
const db = require("../db/queries.js");


/////////////////////////////////USER ROUTES

router.post('/users', function (req, res, next) {
    db.checkUserExists(req.body.username)
    .then(function(users){
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

router.post('/login', async function(req, res, next) {
    console.log(req.body);
    db.checkUserExists(req.body.username)
    .then(async function(users){
        if(!(users[0].count > 0)){
            res.send('Username or password is incorrect.')
        } else {
            let response = await db.checkUsernamePassword(req.body)
            console.log('user ID in index response', response);
            response === false ? res.send('Username or password is incorrect.') : res.send(response)
        }
    })
    .catch(function(error){
        next(error);
    });
  
})

router.get('/users/:id', function (req, res, next){
    db.getSingleUser(req.params.id)
    .then(function(users){
        res.status(200).json(users);
    })
    .catch(function(error){
        next(error);
    });
})

router.delete('/users', function(req, res, next){
    let id = req.body.id;
    db.deleteUser(id)
        .then(function(users){
            res.send(`User deleted with id: ${id}`)
        })
        .catch(function(error){
        next(error);
        });
        
})

router.put('/users', function(req, res, next){
    let id = req.body.id;
    console.log(id);
    console.log(req.body.username);
    db.checkIdExists(id)
    .then(function(users){
        console.log(users);
        if(users[0].count > 0){
            db.updateUser(id, req.body)
            .then(function(users){
                res.send(`User updated with id: ${id}`)            
            })
            .catch(function(error) {
                next(error);
            })        
        } else{
            res.send("An account with that user ID does not exist.")
        }
    })
    .catch(function(error){
        next(error);
    });
})

/////////////////////////////////HABIT ROUTES

router.get("/allHabits/:userID", function(req, res, next){
    db.getAllHabits(req.params.userID)
    .then((habits) => {
        res.status(200).json(habits);
    }).catch((error) => {
        next(error);
    })
})

router.get("/habits/:id", function(req, res, next){
    db.getSingleHabit(req.params.id)
    .then((habits) => {
        res.status(200).json(habits);
    }).catch((error) => {
        next(error);
    })
})

router.delete('/habits', function(req, res, next){ 
    let id = req.body.id;
    db.deleteHabit(id)
        .then(function(habits){
            res.send(`Habit deleted with id: ${id}`)
        })
        .catch(function(error){
            next(error);
        });  
})

//////////////////////////UPDATING HABIT 
router.put('/habits', function(req, res, next){ /////// Trying to copy username/userid checks to habit update
    let id = req.body.id;
    let body = req.body;

    db.checkHabitIdExists(id)
    .then(function(habits){
        if(habits[0].count > 0){
            db.updateHabit(id, body)
            .then(function(habits){
                res.send(`Habit updated with id: ${id}`)
            })
            .catch(function(error){
                next(error);
            }) 
        } else{
            res.send("A habit with that habit ID does not exist")
        }
    })
    .catch(function(error){
        next(error);
    });
})

///////////////////////ADDING NEW HABIT
router.post('/habits', function (req, res, next) { //No duplicate habit check needed?
   
    db.addHabit(req.body)
    .then(function(users){
        res.send('Habit Created')            
    })
    .catch(function(error) {
        next(error);
    })

})

module.exports = router;