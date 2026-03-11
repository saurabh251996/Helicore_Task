require("dotenv").config();

const mongoose=require("mongoose");

const connectDB=require("../config/db")

const User=require("../models/user")

const { hashPassword }=require("../utils/hash");

const { ROLES } = require("../constants/enums");

// SEED ADMIN USER

const users=[
    {
    name: "Admin",
    email: "admin@helicore.com",
    password: "123456",
    role: ROLES.ADMIN
  },
  {
    name: "User",
    email: "user@helicore.com",
    password: "123456",
    role: ROLES.USER
  }

]

const seedAdmin= async()=>{

    try{

        await connectDB();

        for(const user of users)
        {
              const existingUser=await User.findOne({
                 email:user.email
        });

        if(existingUser)
        {
            console.log(`${user.email} already exists`);
            continue
        }

            const hashedPassword= await hashPassword("123456")

        await User.create({
            name:user.name,
            email:user.email,
            password:hashedPassword,
            role:user.role
        });
        
        console.log(`${user.role} created → ${user.email}`);

    }
    
    console.log("User seeding completed")

    await mongoose.disconnect();

    process.exit();

    }
    catch(error){
        console.error("Seeder error:",error)
        process.exit(1);

    }
}

seedAdmin();