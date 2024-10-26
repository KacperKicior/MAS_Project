const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const Invoice = sequelize.define('Invoice', {
        cost: {
            type: DataTypes.FLOAT
        },
        status: {
            type: DataTypes.ENUM('Oplacona','Nieoplacona','Wystawiona'),
        },
        optionalInfo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Invoice;
}