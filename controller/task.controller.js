const asyncHandler=require("../utils/asyncHandler")
const taskService=require("../services/task.service");
const { success } = require("zod");

exports.createTask=asyncHandler(async(req,res)=>{
    const task=await taskService.createTask(req.body,req.user);
    res.status(201).json({
        success:true,
        message:"Task created successfully",
        data:task
    })
})


exports.getTasks=asyncHandler(async(req,res)=>{

    const result=await taskService.getTasks(
        req.query,
        req.user
    );

    res.status(200).json({
        success:true,
        message:"Tasks fetched successfully",
        data:result.tasks,
    })
})


exports.getTaskById=asyncHandler(async (req,res)=>{

    const result=await taskService.getTaskById(
        req.params.id,
        req.user
    )

    res.status(200).json({
        success:true,
        message:"Task details fetched",
        data:result
    })
})


exports.updateTask=asyncHandler(async(req,res)=>
{
    const task =await taskService.updateTask(
        req.params.id,
        req.body,
        req.user
    )

    if(req.body.comment)
    {
        await taskService.addComment(
            task._id,
            req.body.comment,
            req.user.id
        )
    }

    res.status(200).json({
        success:true,
        message:"Task updated successfully",
        data:task
    })
})


exports.deleteTask=asyncHandler(async(req,res)=>{

    await taskService.deleteTask(req.params.id)

    res.status(200).json({
        success:true,
        message:"Task deleted successfully"
    })
})

