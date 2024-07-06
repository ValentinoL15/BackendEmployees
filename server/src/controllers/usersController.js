const userModel = require('../routes/models/Users');
const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcryptjs' ) ;

const createUser = async function (req,res){
    try {
        const newUser = new userModel({
            email : req.body.email, 
            password : req.body.password
        });
        await newUser.save();
        const token = jwt.sign({_id: newUser.id}, "secretKey", {expiresIn: "1h"})
        res.status(201).json({message: 'User Created Successfully!',token});
    }catch(e){
        console.log(e)
    }
}

const signIn = async function (req,res) {
    const user = await userModel.findOne({email: req.body.email});

    if(!user) {
        return res.status(401).json({message:"Invalid Email!"});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if(!isMatch) {
        return res.status(401).json({message:'Password Invalid!'});
    }

    const token = jwt.sign({_id: user._id}, "secretKey", {expiresIn: "1h"})

    return res.status(200).json({message: 'Token: ', token})
}

const public = (req,res) => {
    res.json([
        {
            id:1,
            name: "Tarea publica 1",
            description: "loreem ipsum",
        },
        {
            id:2,
            name: "Tarea publica 2",
            description: "loreem ipsum",
        },
        {
            id:3,
            name: "Tarea publica 3",
            description: "loreem ipsum",
        }
    ])
}

const private = (req,res) => {
    res.json([
        {
            id:1,
            name: "Tarea privada 1",
            description: "loreem ipsum",
        },
        {
            id:2,
            name: "Tarea privada 2",
            description: "loreem ipsum",
        },
        {
            id:3,
            name: "Tarea privada 3",
            description: "loreem ipsum",
        }
    ])
}

module.exports = {
    createUser,
    signIn,
    public,
    private
}