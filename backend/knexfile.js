module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "./feedbackzon.sqlite"
    },
    migrations: { directory: "./src/database/migrations" },
    seeds: { directory: "./src/database/seeds" },
    useNullAsDefault: true
  },

  production: {
    client: 'mssql',
    connection: {
      host: process.env.ENV_DB_HOST,
      user: process.env.ENV_DB_USER,
      password: process.env.ENV_DB_SECRET,
      database: process.env.ENV_DB_DATABASE
    },
    migrations: { directory: "./src/database/migrations" },
    seeds: { directory: "./src/database/seeds" },
    useNullAsDefault: true
  }
};