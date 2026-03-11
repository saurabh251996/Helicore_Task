const express =require('express');
const authRoutes=require("./routes/auth.routes")
const taskRoutes=require("./routes/task.routes")

const errorMiddleware=require("./middleware/error.middleware")

const app=express()

app.use(express.json());

app.use("/auth",authRoutes);
app.use("/tasks",taskRoutes)

app.use(errorMiddleware);

module.exports=app