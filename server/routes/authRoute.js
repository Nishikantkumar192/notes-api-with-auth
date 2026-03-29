const express=require("express");
const { registerUser, loginUser, logoutUser } = require("../controller/authController");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isUserExist,logoutUser);

module.exports=router;