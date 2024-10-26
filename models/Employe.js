const {DataTypes}=require('sequelize');

module.exports = (sequelize) =>{
    const Employe = sequelize.define('Employe', {
        hourRate: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        contractType: {
            type: DataTypes.ENUM('Umowa o prace', 'Umowa zlecenie'),
            allowNull: false,
        },
        hasPredicate: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });

    return Employe;
}