const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
     const Report = sequelize.define('Report', {
        dateCreate: {
            type: DataTypes.DATE,
        },
        score: {
            type: DataTypes.FLOAT
        }
    });
     return Report;
}