const { Employee } = require('../models/models');

class EmployeeController {
    // Получение всех сотрудников
    static async getAllEmployees(req, res) {
        try {
            const employees = await Employee.findAll();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении сотрудников' });
        }
    }

    // Получение сотрудника по ID
    static async getEmployeeById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const employee = await Employee.findByPk(id);
            if (!employee) {
                res.status(404).json({ error: 'Сотрудник не найден' });
            } else {
                res.status(200).json(employee);
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении сотрудника' });
        }
    }

    // Создание нового сотрудника
    static async createEmployee(req, res) {
        const { name, position, rank, contactInformation } = req.body;
        try {
            const newEmployee = await Employee.create({
                name,
                position,
                rank,
                contactinformation: contactInformation,
            });
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при создании сотрудника' });
        }
    }

    // Обновление сотрудника
    static async updateEmployee(req, res) {
        const id = parseInt(req.params.id);
        const { name, position, rank, contactInformation } = req.body;
        try {
            const employee = await Employee.findByPk(id);
            if (!employee) {
                res.status(404).json({ error: 'Сотрудник не найден' });
            } else {
                employee.name = name;
                employee.position = position;
                employee.rank = rank;
                employee.contactinformation = contactInformation;
                await employee.save();
                res.status(200).json(employee);
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при обновлении сотрудника' });
        }
    }

    // Удаление сотрудника
    static async deleteEmployee(req, res) {
        const id = parseInt(req.params.id);
        try {
            const employee = await Employee.findByPk(id);
            if (!employee) {
                res.status(404).json({ error: 'Сотрудник не найден' });
            } else {
                await employee.destroy();
                res.status(200).json({ message: `Сотрудник с ID ${id} удален` });
            }
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при удалении сотрудника' });
        }
    }
}

module.exports =  EmployeeController;
