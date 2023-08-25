const Sequelize = require('sequelize');
const connection = require('./database');

const RespostaModel = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

RespostaModel.sync({ force: false });

module.exports = RespostaModel;
