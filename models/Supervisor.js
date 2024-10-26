const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const Supervisor = sequelize.define('Supervisor', {
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
    return Supervisor;
}