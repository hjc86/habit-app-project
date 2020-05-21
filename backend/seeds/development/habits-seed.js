
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('habits').del()
    .then(function () {
      // Inserts seed entries
      return knex('habits').insert([
        {
          user_id: 1,
          habit_name: 'water',
          current_value: 0,
          target_value: 2000,
          frequency: 1,
          start_date: 1589760000,
          end_date: 1589846399,
          streak: 0,
          completed: false
        },
     
      ]);
    });
};
