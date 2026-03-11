const express=require("express")

const router=express.Router()

const validate=require("../middleware/validate.middleware")

const authController=require("../controller/auth.controller")

const { loginSchema } = require("../validations/auth.validation")

router.post("/login", validate(loginSchema), authController.login);

module.exports=router;
