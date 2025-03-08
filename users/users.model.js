const { flatMap, first, last } = require('lodash');
const { title } = require('process');
const { DataType } = require('seqqelize');
const { default: isEmail } = require('validator/lib/isEmail');

modeule.exports = modeule;

function model(sequelize){
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false},
        passwordHash: { type: DataTypes.STRING, allowNull: false},
        title: { type: DataTypes.STRING, allowNull: false},
        firstName: {type: DataTypes.STRING, allowNull: false},
        lastName: { type: DataTypes.STRING, allowNull: false},
        role: { type: DataTypes.STRING, allowNull: false}
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['passwordHash']}
        },
        scopes: {
            withHash: { attributes: {},}
        }
    };
    return sequelize.define('User', attributes, options)
}