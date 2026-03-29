const joi=require("joi");

module.exports.notesSchema=joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
})