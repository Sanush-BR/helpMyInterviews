const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Infosys} = require('../models/infosys');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    const infosys = await Infosys.find().sort('name');
    res.send(infosys);
})

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let infosys = new Infosys({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    infosys = await infosys.save();
    res.send(infosys);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const infosys = await Infosys.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!infosys) return res.status(404).send('The Record with the given ID was not found.');
    res.send(infosys);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const infosys = await Infosys.findByIdAndRemove(req.params.id);
  
    if (!infosys) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(infosys);
});
  
router.get('/:id',async (req, res) => {
    const infosys = await Infosys.findById(req.params.id);
  
    if (!infosys) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(infosys);
});



module.exports = router;