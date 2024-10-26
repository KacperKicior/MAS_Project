const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const Person = sequelize.define('Person', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phonenmbr: {
            type: DataTypes.NUMBER,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Person;
}