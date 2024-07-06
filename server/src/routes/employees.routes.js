const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeesController')

router.get('/', employeeController.getEmployees)

router.get('/:id', employeeController.getById)

router.post('/', employeeController.createEmployee)

router.put('/:id', employeeController.updateEmployee)

router.delete('/:id', employeeController.deleteEmployee)



module.exports = router