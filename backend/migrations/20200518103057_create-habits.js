
exports.up = function(knex) {

    return knex.schema.createTable('habits', tbl => { 
        tbl.increments();
        tbl.integer('user_id').notNullable();
        tbl.foreign('user_id').references('users.id');
        tbl.string('habit_name', 255).notNullable();
        tbl.integer('current_value', 255).notNullable();
        tbl.integer('target_value', 255).notNullable();
        tbl.integer('frequency', 255).notNullable();
        tbl.integer('start_date', 255).notNullable();
        tbl.integer('end_date', 255).notNullable();
        tbl.integer('streak', 255).notNullable();
        tbl.boolean('completed', 255).notNullable();
    } )
};


exports.down = function(knex) {
  
    return knex.schema.dropTableIfExists('habits');
};
