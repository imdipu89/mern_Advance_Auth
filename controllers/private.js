exports.getPrivateRoute = (req,res,next)=>{
    res.status(200).json({
        success:true,
        date:"access to the private route"
    })
}