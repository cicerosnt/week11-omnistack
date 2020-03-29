const knext = require('knex');
const configuration = require('../../knexfile');

const connection = knext(configuration.development);

module.exports = connection;