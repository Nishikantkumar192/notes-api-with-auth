const jwt=require("jsonwebtoken");
const ExpressError = require("./utils/ExpressError");
const User = require("./models/userModel");
const Notes = require("./models/notesModel");

module.exports.isUserExist=(req,res,next)=>{
    const {token}=req.cookies;
    try{
        if(!token){
            return next(new ExpressError(401,"UnAuthorized User"));
        }
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET,);
        if(tokenDecode.id){
            req.user={id:tokenDecode.id};
        }else{
            return next(new ExpressError(401,"UnAuthorized User"));
        }
        next();
    }catch(err){
        return next(err);
    }
}

module.exports.isPermission=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId);
        const {id}=req.params;
        const note=await Notes.findById(id);
        if(!note) return res.status(400).json({success:false,message:"Page not found"});
        if(user.role==="admin" || note.relatedUser.toString()===userId){
            next();
        }else{
            return next(new ExpressError(403,"Permission Denied"));
        }
    }catch(err){
        return next(err);
    }
}