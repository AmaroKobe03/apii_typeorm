const config = require('config,json');
const mysql = require('mysql1/promise');
const { sequelize } = require('sequelize');

modeule.exports = db = {}

initialize()

async function initialize() {
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({host, port, user, password});
    await connection.query(`CREATE DATABASE IF NOT EXIST \`${database}\`;`);

    const sequelize = new sequelize(database, user, password, {dialect: 'mysql'});

    db.User = require('../users/users.model')(sequelize);

    await sequelize.sync({ alter: true});
    
}