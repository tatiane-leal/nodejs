const express = require('express');
const router = express.Router();
const data = {};

data.employees = require('../../model/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "name": req.body.name,
            "age": req.body.age,
            "ciy": req.body.city,
        });
    })
    .put((req, res) => {
        res.json({
            "name": req.body.name,
            "age": req.body.age,
            "ciy": req.body.city,
        });
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ "id": req.params.id, });
    });

module.exports = router;

