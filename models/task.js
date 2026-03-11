const mongoose=require("mongoose")
const {STATUS,PRIORITY} =require("../constants/enums")

const taskSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true

        },
        description:{
            type:String,
            required:true,
            trim:true

        },
        status:{
            type:String,
            enum:Object.values(STATUS),
            default:STATUS.PENDING
        },
        priority:{
            type:String,
            enum:Object.values(PRIORITY),
            default:PRIORITY.MEDIUM
        },
        assignedTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User" ,
            required:true  
        },

        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        dueDate:{
            type:Date,
            default:null
         }
        },
         {
            timestamps:true
        }
    );

        // convert _id into id

        taskSchema.set("toJSON", {
            transform:function(doc,ret){
                ret.id=ret._id;
                delete ret._id;
                delete ret.__v;



            }
        })
    
    
module.exports=mongoose.model("Task",taskSchema)