const exp=require('express')
const app=exp()
const path=require('path')
const mclient=require("mongodb").MongoClient
app.use(exp.json())
require('dotenv').config()
const {request}=require('http')
app.use(exp.static(path.join(__dirname,'./build')))
const DBurl=process.env.DATABASE_CONNECTION_URL
mclient.connect(DBurl)
.then((client)=>{
    let dbObj=client.db("vnr2022db")
    let userCollectionObject=dbObj.collection("usercollection")
    let todoCollectionObject=dbObj.collection("todocollection")
    app.set("userCollectionObject",userCollectionObject)
    app.set("todoCollectionObject",todoCollectionObject)
})
.catch(err=>console.log('Error in DB connection',err))
const userApp=require('./APIS/userApi')

app.use('/user',userApp)
app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})
const port=process.env.PORT
app.listen(port,()=>console.log("Ahhhhhhhh"))