const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const JobConstant = sequelize.define('JobConstant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        commision: {
            type: DataTypes.INTEGER,
        }
    });
    return JobConstant;
}