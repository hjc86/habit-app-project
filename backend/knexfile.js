// Update with your config settings.

module.exports = {

development: {
  client: 'sqlite3',
  connection: {
    filename: './db/habit_db.sqlite3'
  },

  migrations: {
    directory: __dirname +'/migrations'
  },
  seeds: {
    directory:__dirname+ '/seeds/development'
  }
},

test: {
  client: 'sqlite3',
  connection: {
    filename: ':memory:'
  },

  migrations: {
    directory:  __dirname + '/migrations'
  },
  seeds: {
    directory: __dirname + '/seeds/test'
  }

}

}
