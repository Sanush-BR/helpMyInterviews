const Joi = require('joi');

function validate(req){

    const schema = Joi.object({

        name: Joi.string().min(3).max(20).required(),
        year: Joi.date().required(),
        role: Joi.string().min(3).max(20).required(),
        resources: Joi.string().min(5).max(255).required(),
        github_Profile: Joi.string().min(5).max(255).required(),
        linkedIn_Profile: Joi.string().min(5).max(255).required()

    });

    return schema.validate(req);
}

module.exports.validate = validate; 