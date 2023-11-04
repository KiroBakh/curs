const { Medication } = require('../models/models');

class MedicationController {
    static async getAllMedications(req, res) {
        try {
            const medications = await Medication.findAll();
            res.status(200).json(medications);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении лекарств' });
        }
    }

    static async getMedicationById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const medication = await Medication.findByPk(id);
            if (!medication) {
                res.status(404).json({ error: 'Лекарство не найдено' });
            } else {
                res.status(200).json(medication);
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении лекарства' });
        }
    }

    static async createMedication(req, res) {
        const { name, dosage, availability } = req.body;
        try {
            const newMedication = await Medication.create({
                name,
                dosage,
                availability,
            });
            res.status(201).json(newMedication);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при создании лекарства' });
        }
    }

    static async updateMedication(req, res) {
        const id = parseInt(req.params.id);
        const { name, dosage, availability } = req.body;
        try {
            const medication = await Medication.findByPk(id);
            if (!medication) {
                res.status(404).json({ error: 'Лекарство не найдено' });
            } else {
                medication.name = name;
                medication.dosage = dosage;
                medication.availability = availability;
                await medication.save();
                res.status(200).json(medication);
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при обновлении лекарства' });
        }
    }

    static async deleteMedication(req, res) {
        const id = parseInt(req.params.id);
        try {
            const medication = await Medication.findByPk(id);
            if (!medication) {
                res.status(404).json({ error: 'Лекарство не найдено' });
            } else {
                await medication.destroy();
                res.status(200).json({ message: `Лекарство с ID ${id} удалено` });
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при удалении лекарства' });
        }
    }
}

module.exports =  MedicationController;
