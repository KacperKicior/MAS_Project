const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const SupervisorManager = sequelize.define('SupervisorManager', {
    });
    return SupervisorManager;
}