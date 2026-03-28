const dotenv=require("dotenv");
const path=require("path");
dotenv.config({path:path.resolve("./server/.env")});
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const port=8080;
const authRouter=require("./routes/authRoute.js");
const notesRouter=require("./routes/notesRoute.js");
const cookieParser=require("cookie-parser");
const ExpressError=require("./utils/ExpressError.js");
const cors=require("cors");

const allowedOrigin=["http://localhost:5173"];
app.use(cors({origin:allowedOrigin,credentials:true}))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

main().then(()=>{
    console.log("connected Successfully");
}).catch((error)=>{
    console.log(error);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/backendAssignment');
}
app.listen(port,()=>{
    console.log(`app is listening through ${port}`);
})
app.get("/",(req,res)=>{
    res.send("its working");
})

app.use("/api/auth",authRouter);
app.use("/api/notes",notesRouter);
// app.use((req,res,next)=>{
//     return next(new ExpressError(404,"page not found"));
// })
// app.use((err,req,res,next)={
//     const {statusCode=500,message="server Error"}=err,
    
// })