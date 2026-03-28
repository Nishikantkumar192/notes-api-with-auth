const User=require("../models/userModel.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

module.exports.registerUser=async(req,res,next)=>{
    try{
        const {password,email}=req.body;
        const isDuplicate=await User.findOne({email});
        if(isDuplicate) return res.json({sucess:false,message:"use another email"});
        // if(isDuplicate) return next(new ExpressError(401,"Use another email"));
        const hashPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            ...req.body,
            password:hashPassword,
        });
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000,
        })
        return res.json({success:true,message:"you have registered successfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
        // return next(err);   //Skip everything and send this error to the error handling middleware
    }
}
module.exports.loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return next(new ExpressError(400,"Invalid credentials"));
        const isValid=await bcrypt.compare(password,user.password);
        if(!isValid) return next(new ExpressError(400,"Invalid credentials"));
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000,
        })
        return res.json({success:true,message:"logged-in successfull"});
    }catch(err){
        return next(err);
    }
}
module.exports.logoutUser=(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
        })
        return res.json({success:true,message:"logout successfull"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

