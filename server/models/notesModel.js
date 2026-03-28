const mongoose=require("mongoose");

const notesSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true}
})
const note=mongoose.model("note",notesSchema);
module.exports=note;