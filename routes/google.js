const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Google} = require('../models/google');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


router.get('/',auth,async(req,res) => {
    try{
        const google = await Google.find().sort('name');
        res.send(google);
    }
    catch(ex){   
        next(ex);
    }
    
})

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let google = new Google({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    google = await google.save();
    res.send(google);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const google = await Google.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile

    }, { new: true } );

    if (!google) return res.status(404).send('The Record with the given ID was not found.');
    res.send(google);

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const google = await Google.findByIdAndRemove(req.params.id);
  
    if (!google) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(google);
});
  
router.get('/:id',async (req, res) => {
    const google = await Google.findById(req.params.id);
  
    if (!google) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(google);
});



module.exports = router;