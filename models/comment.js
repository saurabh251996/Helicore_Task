const mongoose= require("mongoose")

const commentSchema=new mongoose.Schema(
    {
        task:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task",
            required:true,
            index:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        comment:{
            type:String,
            required:true,
            trim:true

        }
    

    },
    {
        timestamps:true
    }
);

    //convert _id into id
    commentSchema.set("toJSON",{
        transform:function(doc,ret)
        {
            ret.id=ret._id;
            delete ret._id;
            delete ret.__v;
        }

    })


module.exports=mongoose.model("Comment",commentSchema)