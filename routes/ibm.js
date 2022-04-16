const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Ibm} = require('../models/ibm');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    
        const ibm = await Ibm.find().sort('name');
        res.send(ibm);
      
});

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let ibm = new Ibm({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    ibm = await ibm.save();
    res.send(ibm);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const ibm = await Ibm.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!ibm) return res.status(404).send('The Record with the given ID was not found.');
    res.send(ibm);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const ibm = await Ibm.findByIdAndRemove(req.params.id);
  
    if (!ibm) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(ibm);
});
  
router.get('/:id',async (req, res) => {
    const ibm = await Ibm.findById(req.params.id);
  
    if (!ibm) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(ibm);
});



module.exports = router;