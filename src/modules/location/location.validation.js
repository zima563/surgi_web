const Joi = require("joi")

const addLocationVal = Joi.object({
    name: Joi.string().trim().min(3).max(500).required(),
});

const updateLocationVal = Joi.object({
    id: Joi.string().required(),

    name: Joi.string().trim().min(3).max(500),
})

module.exports = {
    addLocationVal,
    updateLocationVal
}

