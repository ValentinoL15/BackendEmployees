const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    email: {
        type:String,
        required:true,
        validate: {
            validator: function(email) {
                const regex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/;
                return regex.test(email)
            },
            message: "El email introducido no es válido"
        }
    },
    password: {
        type: String,
        required:true,
        validate: {
            validator: function(password){
                const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
                return regex.test(password)
            },
            message: "La contraseña debe contener al menos 1 Mayúscula, 1 minúscula, 1 número y debe ser al menos de 8 caracteres"
        }
    }
    })

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const userModel = mongoose.model( 'User', userSchema );

module.exports = userModel