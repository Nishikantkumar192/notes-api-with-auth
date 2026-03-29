const jwt=require("jsonwebtoken");
const ExpressError = require("./utils/ExpressError");

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