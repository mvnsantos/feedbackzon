const knex = require('knex');
const configuration = require('../../knexfile');

const stringConnection = process.env.PORT ? configuration.production : configuration.development;

const connection = knex(stringConnection);

module.exports = connection;