const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mean-employees')
.then(() => {
    console.log('Base de datos conectada correctamente')
})
.catch((e) => {
    console.log(e)
})