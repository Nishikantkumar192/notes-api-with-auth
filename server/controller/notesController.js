const Notes=require("../models/notesModel.js");
const ExpressError = require("../utils/ExpressError.js");
const { wrapAsync } = require("../utils/wrapAsync.js");

module.exports.newNote=wrapAsync(async(req,res)=>{
    const userId=req.user.id;
    if(!userId) return next(new ExpressError(401,"permission denied"));
    const newOne=await Notes.create({
        ...req.body,
        relatedUser:userId,
    })
    return res.json({success:true,message:"successfully fetch",newOne});
});
module.exports.getNotes=async(req,res)=>{
    const allNotes=await Notes.find();
    return res.json({success:true,message:"fetching notes",allNotes});
}
module.exports.delteNotes=async(req,res,next)=>{
    const {id}=req.params;
    if(!id) return next(new ExpressError(400,"Invalid Note"));
    await Notes.findByIdAndDelete(id);
    return res.json({success:true,message:"deleted Successfully",})
}