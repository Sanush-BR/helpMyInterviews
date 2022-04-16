const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Tcs} = require('../models/tcs');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    
        const tcs = await Tcs.find().sort('name');
        res.send(tcs);
      
});

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let tcs = new Tcs({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    tcs = await tcs.save();
    res.send(tcs);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const tcs = await Tcs.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!tcs) return res.status(404).send('The Record with the given ID was not found.');
    res.send(tcs);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    constcs = await Tcs.findByIdAndRemove(req.params.id);
  
    if (!tcs) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(tcs);
});
  
router.get('/:id',async (req, res) => {
    const tcs = await Tcs.findById(req.params.id);
  
    if (!tcs) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(tcs);
});



module.exports = router;