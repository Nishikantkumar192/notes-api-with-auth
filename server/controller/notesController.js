const Notes=require("../models/notesModel.js");

module.exports.newNote=async(req,res)=>{
    try{
        const userId=req.user.id;
        await Notes.create({
            ...req.body,
            relatedUser:userId,
        })
        return res.json({success:true,message:"new Notes added"});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}