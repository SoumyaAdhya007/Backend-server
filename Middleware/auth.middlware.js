const jwt = require('jsonwebtoken');


const authentication=(req,res,next)=>{
    
    const token=req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token, "masai");
        try {
            if(decoded){
                const userID=decoded.userId;
                console.log(userID);
                req.body.userId=userID;
                next()
            }else{
                res.send("please login")
            }
        } catch (error) {
            res.send({"msg":"invalid Token"})
        }
    }else{
        res.send("please login")
    }
}

module.exports={
    authentication
}