const Notes=require("../models/notesModel.js");
const ExpressError = require("../utils/ExpressError.js");
const { wrapAsync } = require("../utils/wrapAsync.js");
const User=require("../models/userModel.js");

module.exports.newNote=wrapAsync(async(req,res,next)=>{
    const userId=req.user.id;
    if(!userId) return next(new ExpressError(401,"permission denied"));
    const newOne=await Notes.create({
        ...req.body,
        relatedUser:userId,
    })
    return res.json({success:true,message:"successfully Added",newOne});
});
module.exports.getNotes=async(req,res)=>{
    const userId=req.user.id;
    const user=await User.findById(userId);
    const notesToSend = user.role === "admin"
    ? await Notes.find()
    : await Notes.find({ relatedUser: userId });
    return res.json({success:true,message:"fetching notes",allNotes:notesToSend});
}
module.exports.delteNotes=async(req,res,next)=>{
    const {id}=req.params;
    if(!id) return next(new ExpressError(400,"Invalid Note"));
    await Notes.findByIdAndDelete(id);
    return res.json({success:true,message:"deleted Successfully",})
}
module.exports.getParticularNotes=wrapAsync(async(req,res,next)=>{
    const {id}=req.params;
    const note=await Notes.findById(id);
    if(!note) return next(new ExpressError(400,"Page Not found"));
    const particularNotes=await Notes.findById(id);
    return res.json(particularNotes);
})
module.exports.updateNoteDetails=wrapAsync(async(req,res,next)=>{
    const {id}=req.params;
    console.log(id);
    const note=await Notes.findById(id);
    if(!note) return next(new ExpressError(400,"page not found"));
    await Notes.findByIdAndUpdate(
        id,                  
        { $set: req.body },
        { new: true }
    );
    return res.json({success:true,message:"Notes updated successfully"});
});