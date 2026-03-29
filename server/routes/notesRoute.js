const express=require("express");
const { newNote, getNotes, delteNotes } = require("../controller/notesController");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.post("/newNotes",isUserExist,newNote);
router.get("/getNotes",isUserExist,getNotes);
router.get("/deleteNote/:id",delteNotes);
module.exports=router;