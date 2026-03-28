const express=require("express");
const { newNote } = require("../controller/notesController");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.post("/newNotes",isUserExist,newNote);
module.exports=router;