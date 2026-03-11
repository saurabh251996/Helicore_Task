const  {z}=require("zod")
const {STATUS,PRIORITY} =require("../constants/enums")

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createTaskSchema=z.object({

    title:z.string().min(3,"Title must be at least 3 characters"),

    description:z.string().min(5,"Description must be atleast 5 characters"),

    comment: z.string().min(1, "Comment text is required"),

    priority:z.enum(Object.values(PRIORITY)),

    assignedTo:z.string().optional(),

    dueDate:z.string().optional()
}).strict()

const updateTaskSchema=z.object({

    status:z.enum(Object.values(STATUS)).optional(),

    priority:z.enum(Object.values(PRIORITY)).optional(),

    description:z.string().optional(),

    dueDate:z.string().optional(),

    comment: z.string().min(1).optional(),


}).strict()

module.exports={
    createTaskSchema,
    updateTaskSchema
}