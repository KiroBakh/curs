const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router.get('/employees', employeesController.getAllEmployees);
router.get('/employees/:id', employeesController.getEmployeeById);
router.post('/employees', employeesController.createEmployee);
router.put('/employees/:id', employeesController.updateEmployee);
router.delete('/employees/:id', employeesController.deleteEmployee);

module.exports = router;
 