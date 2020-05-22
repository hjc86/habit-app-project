
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('habits').del()
    .then(function () {
      // Inserts seed entries
      return knex('habits').insert([
        {
          user_id: 1,
          habit_name: 'Drink a glass of water',
          current_value: 3,
          target_value: 8,
          frequency: 1,
          start_date: 1589760000,
          end_date: 1589846399,
          streak: 0,
          completed: false
        },
        {
          user_id: 1,
          habit_name: 'Exercise',
          current_value: 0,
          target_value: 3,
          frequency: 7,
          start_date: 1589760000,
          end_date: 1589846399,
          streak: 0,
          completed: false
        },
        {
          user_id: 1,
          habit_name: 'Read a book',
          current_value: 1,
          target_value: 1,
          frequency: 14,
          start_date: 1589760000,
          end_date: 1589846399,
          streak: 1,
          completed: true
        }
        ,
        {
          user_id: 1,
          habit_name: 'Go for a walk',
          current_value: 1,
          target_value: 1,
          frequency: 2,
          start_date: 1589760000,
          end_date: 1589846399,
          streak: 3,
          completed: true
        }
        ,
        {
          user_id: 1,
          habit_name: 'Call family',
          current_value: 0,
          target_value: 1,
          frequency: 7,
          start_date: 1589760000,
          end_date: 1589846399,
          streak: 6,
          completed: false
        }
     
     
     
      ]);
    });
};
