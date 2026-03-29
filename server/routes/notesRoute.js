const express=require("express");
const { newNote, getNotes, delteNotes, getParticularNotes, updateNoteDetails } = require("../controller/notesController");
const { isUserExist } = require("../middleware");
const { notesSchema } = require("../joiSchema");
const ExpressError = require("../utils/ExpressError");
const router=express.Router();

const schemaValidation=(req,res,next)=>{
    const {error}=notesSchema.validate(req.body);
    if(error){
        const errMsg=error.details.map((el)=>el.message).join(",");
        return next(new ExpressError(400,errMsg));
    }
    else next();
}

router.post("/newNotes",schemaValidation,isUserExist,newNote);
router.get("/getNotes",isUserExist,getNotes);
router.get("/deleteNote/:id",isUserExist,delteNotes);
router.get("/getParticularNotes/:id",isUserExist,getParticularNotes);
router.post("/updateNoteDetails/:id",isUserExist,updateNoteDetails);
module.exports=router;