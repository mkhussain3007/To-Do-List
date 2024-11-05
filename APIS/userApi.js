const exp=require('express')
const userApp=exp.Router()
require('dotenv').config()
const expressAsyncHandler=require('express-async-handler')
userApp.use(exp.json())
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
var cloudinary=require("cloudinary").v2
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const multer=require('multer');
const verifyToken=require('./middlewares/verifyToken')
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    secure:true,
})
 const cloudinaryStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"vnr2025",
            public_id:file.fieldname + "-" +Date.now(),

        };
    },
 })
 var upload=multer({storage:cloudinaryStorage})
userApp.get("/getusers",verifyToken,expressAsyncHandler(async(request,response)=>{
    let userCollectionObject=request.app.get("userCollectionObject")
    let users =await userCollectionObject.find().toArray()
    response.send({message:"Users list",payload:users})
}))
userApp.post("/createUser",upload.single("photo"),expressAsyncHandler(async(request,response)=>{
    let userCollectionObject=request.app.get("userCollectionObject")
    console.log(request)
    let newUserObj=JSON.parse(request.body.userObj);
    let userOfDb=await userCollectionObject.findOne({username:{$eq:newUserObj.username}})
    if(userOfDb!==null)
    {
        response.send("Username not available")
    }
    else{
        let hashedPassword= await bcryptjs.hash(newUserObj.password,6)
        newUserObj.password=hashedPassword
        newUserObj.profileImg=request.file.path
        delete newUserObj.photo
        await userCollectionObject.insertOne(newUserObj)
        response.send({message:"User Created"})
    }
}))
userApp.post("/login",expressAsyncHandler(async(request,response)=>{
    let userCollectionObject=request.app.get("userCollectionObject")
    let userCredObj=request.body
    let userOfDb= await userCollectionObject.findOne({username:userCredObj.username})
    if(userOfDb==null)
    {
        response.send({message:'Invalid user'})
    }
    else{
        let status = await bcryptjs.compare(userCredObj.password,userOfDb.password)
        if(status==false)
        {
            response.send({message:'Password wrong'})
        }
        else{
            let token = jwt.sign({username:userOfDb.username},process.env.SECRET_KEY,{expiresIn:10000000})
            response.send({message:'success',payload:token,userObj:userOfDb})
        }
    }
}))
userApp.put("/mod",verifyToken,expressAsyncHandler(async(request,response)=>
{
    let userCollectionObject=request.app.get("userCollectionObject")
    let userCredObj=request.body
    let userofDb = await userCollectionObject.findOne({username:userCredObj.username})
    if(userofDb==null)
    {
        response.send({message:'Invalid user'})
    }
    else{
        let status = await bcryptjs.compare(userCredObj.oldPass,userofDb.password)
        if(status==false)
        {
            response.send({message:'Password wrong'})
        }
        else{
            let hashedPassword= await bcryptjs.hash(userCredObj.newPass,6)
            await userCollectionObject.updateOne({username:userCredObj.username},{$set:{password:hashedPassword}})
            response.send({message:'success',userObj:userofDb})
        }
    }
}))

const todoApp=require('./todoApi')
userApp.use('/todo',todoApp)

userApp.get('/test',verifyToken,(request,response)=>{
    response.send({message:"hiii"})
})





module.exports=userApp