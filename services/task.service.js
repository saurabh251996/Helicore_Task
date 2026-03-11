const Task=require("../models/task")
const Comment=require("../models/comment")
const ActivityLog=require("../models/activityLog")
const User = require("../models/user");


exports.createTask = async (data, user) => {
    // Only ADMIN can create task
    if (user.role !== "ADMIN") {
        const error = new Error("Only admin can create tasks");
        error.statusCode = 403;
        throw error;
    }

    // Check assigned user exists
    const assignedUser = await User.findById(data.assignedTo);

    if (!assignedUser) {
        const error = new Error("Assigned user not found");
        error.statusCode = 404;
        throw error;
    }

    // Separate comment from task data
    const { comment, ...taskData } = data;

    // Create task
    const task = await Task.create({
        ...taskData,
        createdBy: user._id
    });

    // Create comment if provided
    if (comment) {
        await Comment.create({
            task: task._id,
            user: user._id,
            comment: comment
        });
    }

    // Create activity log
    await ActivityLog.create({
        task: task._id,
        user: user._id,
        action: "TASK_CREATED",
        message: `Task "${task.title}" created`
    });

    return task;
};


exports.getTasks=async(query,user)=>{

    const match={};

    if(query.status)
    {
        match.status=query.status
    }

    if(query.priority)
    {
        match.priority=query.priority
    }

    if(user.role==="USER")
    {
        match.assignedTo=user.id
    }

    const page=Number(query.page) || 1;

    const limit=Number(query.limit) || 10

    const skip=(page-1)*limit

    const result=await Task.aggregate([
        {
            $match:match
        },
        {
            $lookup:{
                from:"users",
                localField:"assignedTo",
                foreignField:"_id",
                as:"assignedUser"
            }
        },
        {
            $unwind:{
                path:"$assignedUser",
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"createdBy",
                foreignField:"_id",
                as:"createUser"

            }
        },
        {
            $unwind:{
                path:"$createUser",
                preserveNullAndEmptyArrays:true


            }
        },
        {
               $facet:{
                data:[
                    {
                        $sort:{createdAt:-1}
                    },
                    {
                        $skip:skip
                    },
                    {
                        $limit:limit
                    },
                    {
                        $project:{
                            title:1,
                            description:1,
                            status:1,
                            priority:1,
                            dueDate:1,
                            createdAt:1,
                            assignedUser:{
                                id:"$assignedUser._id",
                                name:"$assignedUser.name",
                                email:"$assignedUser.email"
                            },
                            createdUser:{
                                id:"$createdUser._id",
                                name:"$createdUser.name",
                                email:"$createdUser.email"
                            }

                        }
                    }
                ],

                totalCount:[
                    {$count:"count"}
                ]

        }
     }
    
    ])

    const tasks=result[0].data;
    const total=result[0].totalCount[0]?.count || 0

    return{
        tasks,
        pagination:{
            total,
            page,
            limit,
            totalPages:Math.ceil(total/limit)
        }
    }
}


exports.getTaskById=async(taskId,user)=>{

    const task = await Task.findById(taskId)

    if(!task)
    {
        const error=new Error("Task not found")
        error.statusCode=404
        throw error
    }

    if(user.role==="USER" && task.assignedTo.toString() !==user._id)
    {
        const error=new Error("Forbidden")
        error.statusCode=403
        throw error;
    }

    const comments= await Comment.find({task:task._id});

    const activity=await ActivityLog.find({task:task._id});

    return {
        task,
        comments,
        activity
    };
 
    };
  
    
exports.updateTask=async(taskId,body,user)=>{

    const task=await Task.findById(taskId);

    if(!task)
    {
        const error=new Error("Task not found")
        const statusCode=404
        throw error;
    }

    if(user.role==='USER' && task.assignedTo.toString()!==user.id)
    {
        const error=new Error("Forbidden")
        error.statusCode=403
        throw error;
    }

    if(user.role==="USER")
    {
        task.status=body.status
    }

    else{
        Object.assign(task,body)
    }
    
    await task.save()

    if(data.comment){
        await Comment.create({
            task: task._id,
            user: user._id,
            comment: data.comment
        });
    }
    
    await ActivityLog.create({
        task:task._id,
        user:user.id,
        action:"Task_UPDATED",
        message:"Task updated successfully",
        data:task
        })

        return task
    }


exports.deleteTask=async (taskId)=>{

    const task=await Task.findByIdAndDelete(taskId)

    if(!task)
    {
        const error=new Error("Task not found")
        error.statusCode=404;
        throw error;
    }

    return task
}


exports.addComment=async(taskId,text,userId)=>{

    const comment=await Comment.create({
        task:taskId,
        user:userId,
        text
    })

    await ActivityLog.create({
        task:taskId,
        user:userId,
        action:"COMMENT_ADDED",
        message:"Comment added"
    })

    return comment
}