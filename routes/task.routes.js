const express= require("express")

const router=express.Router()

const auth=require("../middleware/auth.middleware");
const role=require("../middleware/role.middleware");
const validate=require("../middleware/validate.middleware")

const taskController=require("../controller/task.controller")

const { createTaskSchema,updateTaskSchema}=require("../validations/task.validation")

router.use(auth);

router.post("/",role("ADMIN"),
validate(createTaskSchema),
taskController.createTask
)

router.get("/",taskController.getTasks);

router.get("/:id",taskController.getTaskById)

router.put("/:id",
    validate(updateTaskSchema),
    taskController.updateTask
)

router.delete("/:id",role("ADMIN"),taskController.deleteTask);


module.exports=router

