const { Sequelize } = require('sequelize');
const pg = require('pg');

const postgresConnection = new Sequelize(
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB_NAME}`,
    {
        dialect: 'postgres',
        dialectModule: pg
    }
);

async function tryToConnect() {
    try {
        await postgresConnection.authenticate();
        console.log('Postgres: Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { tryToConnect, postgresConnection };
