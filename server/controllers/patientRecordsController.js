const { PatientRecord } = require('../models/models');

class PatientRecordController {
    static async getAllPatientRecords(req, res) {
        try {
            const patientRecords = await PatientRecord.findAll();
            res.status(200).json(patientRecords);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении записей о пациентах' });
        }
    }

    static async getPatientRecordById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const patientRecord = await PatientRecord.findByPk(id);
            if (!patientRecord) {
                res.status(404).json({ error: 'Запись о пациенте не найдена' });
            } else {
                res.status(200).json(patientRecord);
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении записи о пациенте' });
        }
    }

    static async createPatientRecord(req, res) {
        console.log(req.body);
        const { name, employeeId, diagnosis, status, admissiondate } = req.body;
        try {
            const newPatientRecord = await PatientRecord.create({
                name,
                employeeId,
                diagnosis,
                status,
                admissiondate
            });
            res.status(201).json(newPatientRecord);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при создании записи о пациенте' });
        }
    }

    static async updatePatientRecord(req, res) {
        const id = parseInt(req.params.id);
        const { patientid, employeeid, recorddate, recorddescription } = req.body;
        try {
            const patientRecord = await PatientRecord.findByPk(id);
            if (!patientRecord) {
                res.status(404).json({ error: 'Запись о пациенте не найдена' });
            } else {
                patientRecord.patientid = patientid;
                patientRecord.employeeid = employeeid;
                patientRecord.recorddate = recorddate;
                patientRecord.recorddescription = recorddescription;
                await patientRecord.save();
                res.status(200).json(patientRecord);
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при обновлении записи о пациенте' });
        }
    }

    static async deletePatientRecord(req, res) {
        const id = parseInt(req.params.id);
        try {
            const patientRecord = await PatientRecord.findByPk(id);
            if (!patientRecord) {
                res.status(404).json({ error: 'Запись о пациенте не найдена' });
            } else {
                await patientRecord.destroy();
                res.status(200).json({ message: `Запись о пациенте с ID ${id} удалена` });
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при удалении записи о пациенте' });
        }
    }
}

module.exports =  PatientRecordController;
