const jwt=require("jsonwebtoken")
require('dotenv').config()
const verifyToken=(request,response,next)=>{
    let bearerToken=request.headers.authorization;
    if(bearerToken==undefined)
    {
        return response.send({message:"UNNNNNN request"})
    }
    let token=bearerToken.split(" ")[1]
    if(token==null)
    {
        return response.send({message:"Unauthorized request"})
    }
    else{
    try{
    jwt.verify(token,process.env.SECRET_KEY)
    next()
    }
    catch(err)
    {
        return response.send({message:"session expired..relogin again to continue"})
    }
}
}

module.exports=verifyToken;