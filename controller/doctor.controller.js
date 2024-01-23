const express=require("express");

const { DoctorModel } = require("../models/doctorsModel");

const AppointmentController=express.Router();

AppointmentController.get("/",async(req,res)=>{
    try{
        const page=parseInt(req.query.page)-1||0;
        const limit=parseInt(req.query.limit);
        const q=req.query.q || "";
        var sort=req.query.sort ;
        

        

        req.query.sort?(sort=req.query.sort.split(",")):(sort=[sort]);
        let sortBy={};
        if(sort[1]){
            sortBy[sort[0]]=sort[1];
        }
        else{
            sortBy[sort[0]]="asc";
        }

        const doctor=await DoctorModel.find({$or:[{first_name:{$regex:q,$options:"i"}},
        {salary:{$regex:q,$options:"i"}},{department:{$regex:q,$options:"i"}}]})
        .sort(sortBy).skip(page*limit).limit(limit);
        const response={
            error:false,
            page:page+1,
            limit,
            doctor
        }
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json({error:true,message:"Error"});
    }
})

// create
AppointmentController.post("/create", async (req,res)=>{
    const{name,image,specialization,experience,location,date,slots,fee}=req.body;

    
    const doctors_data=await DoctorModel.create({name,image,specialization,experience,location,date,slots,fee});
    res.send({data:doctors_data});
})

// update
AppointmentController.patch("/edit/:Id",async (req,res)=>{
    const Id=req.params.empId;

    const payload=req.body;
    await DoctorModel.findOneAndUpdate({_id:Id},payload);
    res.send({message:`doctors ${Id} Data updated`});
})

// delete
AppointmentController.delete("/delete/:Id",async (req,res)=>{
    const Id=req.params.empId;

    await DoctorModel.findOneAndDelete({_id:Id});
    res.send({message:`doctors ${Id} Data deleted`});
})



module.exports={
    AppointmentController
}