const knex = require('./knex.js');

///////////////////USER QUERIES

function users(user){
    return knex('users');
}

function addUser(user){
    return users().insert(user, 'id');
}

function getSingleUser(user_id){
    return users().where('id', parseInt(user_id)).first();
}

function getAllUsers(){
    return users().select();
}

function checkUserExists(username){
    return users().count('username as count').where('username', username);
}

function checkIdExists(id){
    return users().count('id as count').where('id', id);
}

async function checkUsernamePassword(user){
    let username = user.username;
    let password = user.password;
    let response = await users().where('username', username).first();
    console.log('response in queries: ', response);
    return response.password === password ? `${response.id}` : false;
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

function checkHabitIdExists(id){
    return habits().count('id as count').where('id', id);
}

function checkHabitExists(habit_name){
    return habits().count('habit_name as count').where('habit_name', habit_name);
}


module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    addUser: addUser,
    checkUserExists: checkUserExists,
    checkUsernamePassword: checkUsernamePassword,
    deleteUser: deleteUser,
    updateUser: updateUser,
    addHabit: addHabit,
    updateHabit: updateHabit,
    getAllHabits: getAllHabits,
    getSingleHabit: getSingleHabit,
    deleteHabit: deleteHabit,
    checkIdExists : checkIdExists,
    checkHabitIdExists: checkHabitIdExists,
    checkHabitExists: checkHabitExists
}