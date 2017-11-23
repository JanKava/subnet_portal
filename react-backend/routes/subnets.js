var express = require('express');
var router = express.Router();

var Subnet = require('../models/subnet');

router.get('/:id?',function(req,res,next){
    if (req.params.id){
    Subnet.getGupSubnets(req.params.id, function(err,rows){
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    })
}
else {
    res.send("Wrong query.");
}
});

router.post('/create', function(req, res){
    Subnet.addSubnet(req.query, function(err){
        if(err){
            res.json(err);
        }
        else {
            res.json(req.query);
        }
    })
});

router.delete('/delete/:id', function(req, res){
    Subnet.removeSubnet(req.params.id, function(err, count){
        if(err){
            res.json(err);
        }
        else {
            res.json(count)
        }
    })
})

module.exports= router;
