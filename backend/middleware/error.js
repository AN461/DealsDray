
const errorMiddleware = (err,req,res,next)=>{
    try{
        console.log(err)
        console.log(res.statusCode)
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        return res.json({message:err.message,status:statusCode})
    }catch(err){
        return res.json({message:"server error please try later",status:500})
    }
}

export {errorMiddleware}