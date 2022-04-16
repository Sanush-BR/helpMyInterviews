const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Amazon} = require('../models/amazon');
const {validate} = require('../validation/validate');
const express = require('express');
const Joi = require('joi');
const router = express.Router();



router.get('/',auth,async(req,res) => {

    const amazon = await Amazon.find().sort('name');
    res.send(amazon);
    
});

router.post('/',[auth,admin],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let amazon = new Amazon({ 
        name: req.body.name,
        year: req.body.year,
        role: req.body.role,
        resources: req.body.resources,
        github_Profile: req.body.github_Profile,
        linkedIn_Profile: req.body.linkedIn_Profile
    });

    amazon = await amazon.save();
    res.send(amazon);
});

router.put('/:id',[auth,admin],async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const amazon = await Amazon.findByIdAndUpdate(req.params.id,
            { 
                name: req.body.name,
                year: req.body.year,
                role: req.body.role,
                resources: req.body.resources,
                github_Profile: req.body.github_Profile,
                linkedIn_Profile: req.body.linkedIn_Profile
        
            }, { new: true } );
        
            if (!amazon) return res.status(404).send('The Record with the given ID was not found.');
            res.send(amazon);
    }
    catch(ex){
        console.log(ex.message);
    }
   

});


router.delete('/:id',[auth,admin],async (req, res) => {
    const amazon = await Amazon.findByIdAndRemove(req.params.id);
  
    if (!amazon) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(amazon);
});
  
router.get('/:id',[auth,admin],async (req, res) => {
    const amazon = await Amazon.findById(req.params.id);
  
    if (!amazon) return res.status(404).send('The Record with the given ID was not found.');
  
    res.send(amazon);
});



module.exports = router;