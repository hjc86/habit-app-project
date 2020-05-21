
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'test',
          password: '123'
        },
        {
          username: 'username2',
          password: '123'
        },
        {
          username: 'username3',
          password: '123'
        },
        {
          username: 'username4',
          password: '123'
        },
     
      ]);
    });
};
