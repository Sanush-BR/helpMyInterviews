const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Meta} = require('../models/meta');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    
        const meta = await Meta.find().sort('name');
        res.send(meta);
      
});

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let meta = new Meta({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    meta = await meta.save();
    res.send(meta);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const meta = await Meta.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!meta) return res.status(404).send('The Record with the given ID was not found.');
    res.send(meta);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const meta = await Meta.findByIdAndRemove(req.params.id);
  
    if (!meta) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(meta);
});
  
router.get('/:id',async (req, res) => {
    const meta = await Meta.findById(req.params.id);
  
    if (!meta) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(meta);
});



module.exports = router;