const User=require("../models/user");
const { comparePassword }=require("../utils/hash")
const { generateToken }=require("../utils/jwt")

exports.loginUser=async (email,password)=>{

    const user=await User.findOne({email}).select("+password");

    if(!user)
    {
        const error = new Error("Invalid email or password")
        error.statusCode=401;
        throw error
    }

    const ismatch=await comparePassword(password,user.password)

    if(!ismatch)
    {
        const error= new Error("Invalid email or password")
        error.statusCode=401
        throw error;
    }

    const token= generateToken(user);

    return {
        token,
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    }

}