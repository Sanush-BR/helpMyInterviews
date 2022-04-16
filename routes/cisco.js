
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Cisco} = require('../models/cisco');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    
        const cisco = await Cisco.find().sort('name');
        res.send(cisco);
      
});

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let cisco = new Cisco({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    cisco = await cisco.save();
    res.send(cisco);
});

router.put('/:id',[auth,admin],async(req,res) => {
    console.log(req); 
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const cisco = await Cisco.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!cisco) return res.status(404).send('The Record with the given ID was not found.');
    res.send(cisco);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const cisco = await Cisco.findByIdAndRemove(req.params.id);
  
    if (!cisco) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(cisco);
});
  
router.get('/:id',async (req, res) => {
    const cisco = await Cisco.findById(req.params.id);
  
    if (!cisco) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(cisco);
});



module.exports = router;