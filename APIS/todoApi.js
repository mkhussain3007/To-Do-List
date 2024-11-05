const exp=require('express')
const todoApp=exp.Router()
require('dotenv').config()
const expressAsyncHandler=require('express-async-handler')
todoApp.use(exp.json())
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const verifyToken=require('./middlewares/verifyToken')
todoApp.get("/todos",verifyToken,expressAsyncHandler(async(request,response)=>{
    console.log("hi")
    let todoObj=request.app.get("todoCollectionObject")
    console.log(request.query.username)
    todoArr=await todoObj.find({username:request.query.username}).toArray()
    console.log(todoArr)
    response.send({message:"Got Data",payload:todoArr})
}))
todoApp.post("/add",verifyToken,expressAsyncHandler(async(request,response)=>{
    let todoObj=request.app.get("todoCollectionObject")
    //console.log(request)
    let newTodoObj={...request.body}
    await todoObj.insertOne(newTodoObj)
    response.send({message:"Entered todo"})
}))






module.exports=todoApp