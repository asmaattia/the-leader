const express = require('express');
const router = express.Router();


// import the students controller
const studentsController = require('../controllers/studentsController');


/**
 * @route GET /students
 * @desc Get all students from the inventory
 * @access Public
 */
router.get('/', studentsController.students_GET_All);


/**
 * @route GET /students/:studentId
 * @desc Get a single student
 * @access Public
 */
router.get('/:studentId', studentsController.students_GET_One);


/**
 * @route POST /students
 * @desc Create a new student
 * @access Public
 */
router.post('/', studentsController.students_POST);


/**
 * @route PATCH /student/:studentId
 * @desc Update a value for an student
 * @access Public
 */
router.patch('/:studentId', studentsController.students_PATCH);


/**
 * @route DELETE /students/:studentId
 * @desc Delete an student
 * @access Public
 */
router.delete('/:studentId', studentsController.students_DELETE);


// Exporting the router
module.exports = router;