const mongoose=require("mongoose")

const activitySchema=new mongoose.Schema(
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
        action:{
            type:String,
            required:true,
            trim:true
        },
        message:{
            type:String,
            required:true,
            trim:true
        },
    
    },
        {
            timestamps:true
        }
);
activitySchema.set("toJSON",{
    transform:function(doc,ret){
        ret.id=ret._id;
        delete ret._id,
        delete ret.__v;

    }
});
module.exports=mongoose.model("ActivityLog",activitySchema)