const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Apple} = require('../models/apple');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
        const apple = await Apple.find().sort('name');
        res.send(apple);
})

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let apple = new Apple({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    apple = await apple.save();
    res.send(apple);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const apple = await Apple.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!apple) return res.status(404).send('The Record with the given ID was not found.');
    res.send(apple);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const apple = await Apple.findByIdAndRemove(req.params.id);
  
    if (!apple) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(apple);
});
  
router.get('/:id',async (req, res) => {
    const apple = await Apple.findById(req.params.id);
  
    if (!apple) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(apple);
});



module.exports = router;