const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')

// get all employees
const getEmployees = async (req, res) => {
  const employees = await Employee.find({}).sort({createdAt: -1})

  res.status(200).json(employees)
}
 

// create a new employee
const createEmployee = async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;

  let emptyFields = [];

  if (!firstname) {
    emptyFields.push('firstname');
  }
  if (!lastname) {
    emptyFields.push('lastname');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!phone) {
    emptyFields.push('phone');
  }
  
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  // Add to the database
  try {
    const employee = await Employee.create({ firstname, lastname, email, phone });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such employee'})
  }

  const employee = await Employee.findOneAndDelete({_id: id})

  if(!employee) {
    return res.status(400).json({error: 'No such employee'})
  }

  res.status(200).json(employee)
}

module.exports = {
  getEmployees,
  createEmployee,
  deleteEmployee,
}