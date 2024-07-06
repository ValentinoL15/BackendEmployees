const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: {type:String, required:true},
    position: {type:String, required:true},
    office: {type:String, required:true},
    salary: {type:Number, required:true}
}, 
{
    timestamps: true,
    versionKey: false
})

const employeeModel = mongoose.model('Employee', employeeSchema)

module.exports =  employeeModel;