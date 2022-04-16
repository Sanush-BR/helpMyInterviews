const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Microsoft} = require('../models/microsoft');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    const microsoft = await Microsoft.find().sort('name');
    res.send(microsoft);
})

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let microsoft = new Microsoft({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    microsoft = await microsoft.save();
    res.send(microsoft);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const microsoft = await Microsoft.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!microsoft) return res.status(404).send('The Record with the given ID was not found.');
    res.send(microsoft);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const microsoft = await Microsoft.findByIdAndRemove(req.params.id);
  
    if (!microsoft) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(microsoft);
});
  
router.get('/:id',async (req, res) => {
    const microsoft = await Microsoft.findById(req.params.id);
  
    if (!microsoft) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(microsoft);
});



module.exports = router;