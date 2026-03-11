const mongoose= require("mongoose")
const { ROLES }=require("../constants/enums")

const userSchema=new mongoose.Schema(
    {
       name:{
         type:String,
         required:true,
         trim:true

        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            select:true            // password will not save into database
        },
        role:{
            type:String,
            enum:Object.values(ROLES),
            default:ROLES.USER
        }
    },
    {
        timestamps:true
    }
)

    //convert mongodb _id into id

    userSchema.set("toJSON",{
        transform:function (doc,ret){
            ret.id=ret._id;
            delete ret._id;
            delete ret.__v;

        }

    });

    module.exports=mongoose.model("User",userSchema);

