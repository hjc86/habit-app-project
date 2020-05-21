const express = require("express");
const router = express.Router();
const db = require("../db/queries.js");


/////////////////////////////////USER ROUTES

router.post('/users', function (req, res, next) {
    const defaultError = {defaultError: 'There was an error creating an account.'};
    const errorMessage = {errorMessage: 'Username already exists'};
    const successMessage = {successMessage: 'User created!'};

    if(req.body.username == null || req.body.password == null || req.body.username == '' || req.body.password == ''){
        res.send({errorMessage: 'Please enter a valid username and password'})
    } else {

    db.checkUserExists(req.body.username)
    .then(function(users){
        if(users[0].count > 0){
            res.send(errorMessage)
        } else{
            db.addUser(req.body)
            .then(function(users){
                res.send(successMessage)
            })
            .catch(function(error) {
                res.send(defaultError)
                next(error);
            })
        }
    })
    .catch(function(error){
        res.send(defaultError)
        next(error);
    });
    }
})

router.get('/users', function (req, res, next){
    console.log("GET REQUEST RECIEVED");
    db.getAllUsers()
    .then(function(users){
        res.status(200).json(users);
    })
    .catch(function(error){
        next(error);
    });
})

router.post('/login', function(req, res, next) {
    console.log(req.body);
    const errorMessage = {errorMessage: 'Username or password is incorrect.'};

    if(req.body.username == null || req.body.password == null || req.body.username == '' || req.body.password == ''){
        res.send({errorMessage: 'Please enter a valid username and password'})
    } else {
    db.checkUserExists(req.body.username)
    .then(async function(users){
        if(!(users[0].count > 0)){
            console.log("username does not exist");
            res.send(errorMessage)
        } else {
            db.checkUsernamePassword(req.body)
            .then(function(response){
                console.log('response in index', response);
                response.password === req.body.password && response.username === req.body.username ? res.send(`${response.id}`) : res.send(errorMessage);
                console.log('user ID in index response', response);
            })
        }
    })
    .catch(function(error){
        
        next(error);
    });
    }
  
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
    db.deleteAllHabits(id)
        .then(function(users){
            res.send(`Habits deleted with user id: ${id}`)
        })
        .catch(function(error){
        next(error);
        });
})

router.put('/users', function(req, res, next){
    let id = req.body.id;
    console.log(id);
    console.log(req.body.username);
    let errorMessage = {errorMessage: 'That username is taken.'};
    let successMessage = {successMessage: `Username updated to: ${req.body.username}`}
    let defaultError = {defaultError: 'There was a server error with that.'}
    let currentUsername;
    let currentPassword;

    if(req.body.password == '' && req.body.password == ''){
        res.send({errorMessage: 'Enter a username and password'})
    } else if(req.body.username == ''){
        res.send({errorMessage: 'Enter a username'})
    } else if(req.body.password == ''){
        res.send({errorMessage: 'Enter a password'})
    }
    
    db.getSingleUser(id)
    .then(function(users){
        console.log('USERS GROM SINGLE USER', users);
        currentUsername = users.username;
        currentPassword = users.password;
    }).then(

    db.checkUserExists(req.body.username)
    .then(function(users){
        console.log(users);
        if(users[0].count == 0 || req.body.username == currentUsername){
            db.updateUser(id, req.body)
            .then(function(users){
                res.send(successMessage)            
            })
            .catch(function(error) {
                next(error);
            })        
        } else{
            res.send(errorMessage)
        }
    })
    .catch(function(error){
        next(error);
    })
    )
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

    let errorMessage = {errorMessage: 'Please fill out all information.'};
    let successMessage = {successMessage: 'Habit updated successfully'};
    let defaultError = {defaultError: 'There was a server error with that.'};

    console.log(req.body.habit_name);
    console.log(req.body.target_value);
    if(req.body.habit_name == null || req.body.habit_name == "" || req.body.target_value == null || req.body.target_value == 0){
        console.log("CHECK FAILED");
        res.send(errorMessage);
    } else {

    db.checkHabitIdExists(id)
    .then(function(habits){
        if(habits[0].count > 0){
            db.updateHabit(id, body)
            .then(function(habits){
                // res.send(`Habit updated with id: ${id}`)
                res.send(successMessage);
            })
            .catch(function(error){
                res.send(errorMessage);
                next(error);
            }) 
        } else{
            res.send("A habit with that habit ID does not exist")
        }
    })
    .catch(function(error){
        next(error);
    });
}
})

///////////////////////ADDING NEW HABIT
router.post('/habits', function (req, res, next) { //No duplicate habit check needed?
    const errorMessage = {errorMessage: 'Please fill out all information'};
    const successMessage = {successMessage: 'Habit created successfully'};
    const defaultMessage = {message: 'Server error'};

    db.addHabit(req.body)
    .then(function(users){
        res.send(successMessage)    

    })
    .catch(function(error) {
        res.send(errorMessage)
        next(error);
    })

})

module.exports = router;