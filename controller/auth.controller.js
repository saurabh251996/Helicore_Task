const asyncHandler=require("../utils/asyncHandler");
const {loginUser}=require("../services/auth.service");
const { success } = require("zod");

exports.login=asyncHandler(async(req,res)=>
{
    const {email,password}=req.body

    const result = await loginUser(email,password)
    
    res.status(200).json({
        success:true,
        message:"User login successfully",
        token:result.token,
    })

  
})