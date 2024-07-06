const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const jwt = require( 'jsonwebtoken' );

const app = express();

app.set('port', process.env.PORT || 4000)

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/employees' ,require(`./routes/employees.routes`));
app.use('/api/users' ,require(`./routes/users.routes`))

const verifyToken  = function(req, res, next) {
    let auth = req.headers["authorization"];
    if(!auth) {
        res.json({message: "Missing authorization"})
    }

    const token = auth.split(" ")[1];
    jwt.verify(token, "secretKey", function(err,playload){
        if (err) {
            return res.status(403).send({authenticated : false, message: 'Unauthorized.'});
        } else {
            console.log(playload);
            next()
        }
    })
}

app.verifyToken = verifyToken

module.exports = app