const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const Manager = sequelize.define('Manager', {
        salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
        }
    });
    return Manager;
}