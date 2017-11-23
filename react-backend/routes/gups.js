var express = require('express');
var router = express.Router();

var Gup = require('../models/gup');

router.get('/:id?', function (req, res) {
    if (req.params.id) {
        Gup.getGupById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });

    }
    else {
        Gup.getAllGups(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        })
    }
});

router.post('/filtered', function (req, res) {

    Gup.getFilteredGups(req.query, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    })
});

router.post('/create', function (req, res) {
    Gup.addGup(req.query, function (err) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.query);
        }

    });
});

router.delete('/delete/:id', function (req, res) {
    Gup.removeGup(req.params.id, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }
    });
});
router.put('/:id', function (req, res) {

    Gup.updateGup(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});


module.exports = router;