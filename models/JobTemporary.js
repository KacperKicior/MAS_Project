const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const JobTemporary = sequelize.define('JobTemporary', {
        relatedToConstantJob: {
            type: DataTypes.BOOLEAN
        }
    });
    return JobTemporary;
}