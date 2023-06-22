const express = require('express')
const {
  getEmployees, 
  createEmployee, 
  deleteEmployee, 
} = require('../controllers/employeeController')

const router = express.Router()

// GET all employees
router.get('/', getEmployees)

// POST a new employee
router.post('/', createEmployee)

// DELETE an employee
router.delete('/:id', deleteEmployee)


module.exports = router 