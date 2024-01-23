const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const { AppointmentController } = require("./controller/doctor.controller");
const { userController } = require("./controller/user.controller");
const { authentication } = require("./auth_middleware/authentication");


const app=express();
app.use(cors());
app.use(express.json());
app.use("/user",userController);
app.get("/",(req,res)=>{
  res.send({message:"Masai hospital Api is Working"});
});
app.use(authentication)
app.use("/appointments",AppointmentController);




app.listen( 3030, async () => {
    try {
      await connection;
      console.log("Connected to DataBase");
    } catch (err) {
      console.log(err);
      console.log("error while connecting to DataBase");
    }
    console.log(`App is running on port 4000`);
  });
  
  