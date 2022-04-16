const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Wipro} = require('../models/wipro');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    const wipro = await Wipro.find().sort('name');
    res.send(wipro);
})

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let wipro = new Wipro({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    wipro = await wipro.save();
    res.send(wipro);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const wipro = await Wipro.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!wipro) return res.status(404).send('The Record with the given ID was not found.');
    res.send(wipro);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const wipro = await Wipro.findByIdAndRemove(req.params.id);
  
    if (!wipro) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(wipro);
});
  
router.get('/:id',async (req, res) => {
    const wipro = await Wipro.findById(req.params.id);
  
    if (!wipro) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(wipro);
});



module.exports = router;