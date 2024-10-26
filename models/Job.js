const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const Job = sequelize.define('Job', {
        dateFrom: {
            type: DataTypes.STRING,
        },
        dateTo: {
            type: DataTypes.STRING
        },
        cost: {
            type: DataTypes.FLOAT
        },
        adress: {
            type: DataTypes.STRING
        }
    });
    return Job;
}