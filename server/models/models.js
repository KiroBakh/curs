const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

// Модель для сотрудников
const Employee = sequelize.define('Employee', {
    emploeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    position: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rank: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contactinformation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

const PatientRecord = sequelize.define('PatientRecord', {
    patientRecordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    diagnosis: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.STRING
    },
    admissiondate: {
        type: DataTypes.DATE
    }
});


Employee.hasMany(PatientRecord, { foreignKey: 'employeeId' });
PatientRecord.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = { Employee, PatientRecord };
