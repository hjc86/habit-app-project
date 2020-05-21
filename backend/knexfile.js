// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/habit_db.sqlite3'
    },

    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory:'./db/seeds'
    }
  },




test: {
  client: 'sqlite3',
  connection: {
    filename: './db/habit_db_test.sqlite3'
  },

  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory:'./db/seeds'
  }

}

}
