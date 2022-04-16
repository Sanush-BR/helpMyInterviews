const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Adobe} = require('../models/adobe');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    
        const adobe = await Adobe.find().sort('name');
        res.send(adobe);
      
});

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let adobe = new Adobe({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    adobe = await adobe.save();
    res.send(adobe);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const adobe = await Adobe.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!adobe) return res.status(404).send('The Record with the given ID was not found.');
    res.send(adobe);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const adobe = await Adobe.findByIdAndRemove(req.params.id);
  
    if (!adobe) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(adobe);
});
  
router.get('/:id',async (req, res) => {
    const adobe = await Adobe.findById(req.params.id);
  
    if (!adobe) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(adobe);
});



module.exports = router;