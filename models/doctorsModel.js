
const mongoose = require("mongoose");

const DoctorsSchema = mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    specialization:{type:String,enum:['Cardiologist','Dermatologist','Pediatrician','Psychiatrist']},
    experience:{type:String,required:true},
    location:{type:String,required:true},
    date:{type:String,required:true},
    slots:{type:String,required:true},
    fee:{type:String,required:true},
    
})

const DoctorModel = mongoose.model("doctor",DoctorsSchema)

module.exports = {DoctorModel}