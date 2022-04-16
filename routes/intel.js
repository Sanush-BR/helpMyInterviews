const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Intel} = require('../models/intel');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    
        const intel = await Intel.find().sort('name');
        res.send(intel);
      
});

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let intel = new Intel({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    intel = await intel.save();
    res.send(intel);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const intel = await Intel.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!intel) return res.status(404).send('The Record with the given ID was not found.');
    res.send(intel);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const intel = await Intel.findByIdAndRemove(req.params.id);
  
    if (!intel) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(intel);
});
  
router.get('/:id',async (req, res) => {
    const intel = await Intel.findById(req.params.id);
  
    if (!intel) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(intel);
});



module.exports = router;