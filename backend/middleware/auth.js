const auth = (req,res,next)=>{
    try{
        if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer')){
            res.statusCode = 403
            throw new Error('user not authenticated')
        }
        const secret = process.env.JWT_SECRET
        console.log(secret);
        
        const token = req.headers.authorization.split(' ')[1]
        const isValidToken = jwt.verify(token,secret||'',{complete:true});
        if(!isValidToken){
            res.statusCode = 403
            console.log('not a valid token')
            throw new Error("session expired")
        }
        if(isTokenExpired(token)){
            res.statusCode = 400
            throw new Error('Session Expired')
        }
        const user = isValidToken.payload
        console.log(user)
        req.user = user
        next()
    }catch(err){
        next(err)
    }
}

module.exports = auth;