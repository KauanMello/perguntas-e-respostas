const Sequelize = require('sequelize');

const connection = new Sequelize('node_brainly', 'admin', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
