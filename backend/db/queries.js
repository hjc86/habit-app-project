const knex = require('./knex.js');

///////////////////USER QUERIES

function users(user){
    return knex('users');
}

function addUser(user){
    return users().insert(user, 'id');
}

function checkUserExits(username){
    if(users().where('username', username).first()){
        return true
    } else {
        return false
    }
}

function checkUsernamePassword(user){
    let username = user.username;
    let password = user.password;
    let query = users().where('username', username).first()
    if(query.password === password) {
        return query.id
    } else {
        return false
    }
}

function deleteUser(user_id){
    return users().where('id', parseInt(user_id)).del();
}

function updateUser(user_id, updatedInfo){
    return users().where('id', parseInt(user_id)).update(updatedInfo);
}


///////////////////HABIT QUERIES


function habits(habit){
    return knex('habits');
}

function addHabit(habit){
    return habits().insert(habit, 'id');
}

function updateHabit(habit_id, updatedInfo){
    return habits().where('id', parseInt(habit_id)).update(updatedInfo);
}

function getAllHabits(user_id){
    return habits().where('user_id', parseInt(user_id))
}

function getSingleHabit(habit_id){
    return habits().where('id', parseInt(habit_id)).first();
}

function deleteHabit(habit_id){
    return habits().where('id', parseInt(habit_id)).del();
}


module.exports = {
    addUser: addUser,
    checkUserExits: checkUserExits,
    checkUsernamePassword: checkUsernamePassword,
    deleteUser: deleteUser,
    updateUser: updateUser,
    addHabit: addHabit,
    updateHabit: updateHabit,
    getAllHabits: getAllHabits,
    getSingleHabit: getSingleHabit,
    deleteHabit: deleteHabit
}