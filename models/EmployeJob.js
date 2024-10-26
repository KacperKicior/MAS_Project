const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const EmployeJob = sequelize.define('EmployeJob', {
        workHours: {
            type: DataTypes.INTEGER,
        }
    });
    return EmployeJob;
}