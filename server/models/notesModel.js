const mongoose=require("mongoose");

const notesSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    relatedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},{timestamps:true});
const note=mongoose.model("note",notesSchema);
module.exports=note;