const User=require("../models/userModel.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError.js");
const { wrapAsync } = require("../utils/wrapAsync.js");

module.exports.registerUser=wrapAsync(async(req,res,next)=>{
    const {password,email}=req.body;
    const isDuplicate=await User.findOne({email});
    if(isDuplicate) return next(new ExpressError(401,"Use another email"));
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
    return res.json({success:true,message:"registered successfully"})
});
module.exports.loginUser=wrapAsync(async(req,res,next)=>{
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
        return res.json({success:true,message:"You have Logged-in"})
});
module.exports.logoutUser=(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
    })
    return res.json({success:true,message:"logout successfull"});
}

