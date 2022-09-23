const mongoose = require('mongoose');

// Importing the schema
const Student = require('../models/student');


/**
 * @controller GET /students
 * @desc Get all students from the inventory
 */
const students_GET_All = (req, res, next) => {
    Student.find()
        .select('first_name last_name option math physique science anglais francais stage _id')
        .exec()
        .then(docs => {
            const response = {
                length: docs.length,
                students: docs.map(doc => {
                    return {
                        first_name: doc.first_name,
                        last_name: doc.last_name,
                        option: doc.option,
                        math: doc.math,
                        physique: doc.physique,
                        science: doc.science,
                        anglais: doc.anglais,
                        francais: doc.francais,
                        stage: doc.stage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/students/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


/**
 * @controller GET /students/:studentId
 * @desc Get a single student
 */
const students_GET_One = (req, res, next) => {
    const id = req.params.studentId;
    Student.findById(id)
        .select('first_name last_name option math physique science anglais francais stage _id')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "This id is not found in the database"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};


/**
 * @controller POST /students
 * @desc Create a new student
 */
const students_POST = (req, res, next) => {

    const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        option: req.body.option,
        math: req.body.math,
        physique: req.body.physique,
        science: req.body.science,
        anglais: req.body.anglais,
        francais: req.body.francais,
        stage: req.body.stage
    });

    student
        .save()
        .then(res => {
            const newStudent = res;
            //console.log(newStudent);
        })
        .catch(err => console.log(err))
    res.status(201).json({
        message: 'Created an student using POST request',
        createdStudent: student
    });
};


/**
 * @controller PATCH /student/:studentId
 * @desc Update a value for an student
 */
const students_PATCH = (req, res, next) => {
    const id = req.params.studentId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Student.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Student '+ id +' is successfully updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/students/'+id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


/**
 * @controller DELETE /students/:studentId
 * @desc Delete an student
 */
const students_DELETE = (req, res, next) => {
    const id = req.params.studentId;
    Student.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Student '+ id +' is successfully deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:5000/students'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


// Exporting all controllers
module.exports = {
    students_GET_All,
    students_GET_One,
    students_POST,
    students_PATCH,
    students_DELETE
}