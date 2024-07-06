const modelEmployee = require('../routes/models/employeesModel')

const getEmployees = async function (req,res) {
    try{
        const document = await modelEmployee.find();
        res.status(200).json({message: 'List of employees', data :document});
    }catch(err){
        console.log("Error al obtener los empleados: "+ err);
    }
}

const getById = async function (req,res) {
    try {
        const document = await modelEmployee.findById({_id:req.params.id});
        res.status(200).json({data: document});
    }catch(e){ 
        console.log(e);
    }
}

const createEmployee = async function (req,res) {
    try {
        const newEmployee = new modelEmployee({
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        });
        const employeeSave = await newEmployee.save();
        res.status(201).json({ message:'Empleado creado correctamente',data:employeeSave})
    }catch(e){
        console.log(e);
    }
}

const updateEmployee = async function (req,res) {
    try{
        const document = await  modelEmployee.findByIdAndUpdate({_id:req.params.id}, req.body);
        res.status(200).json({message:"El registro fue actualizado con éxito",data:document});
    }catch(e){
        console.log(e)
    }
}

const deleteEmployee = async function (req,res) {
    try {
        await  modelEmployee.findByIdAndDelete({_id:req.params.id});
        res.status(201).json({message:  "Se ha eliminado el registro"});
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getEmployees,
    getById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}