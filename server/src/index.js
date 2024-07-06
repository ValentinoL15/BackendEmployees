const app = require('./app');
require('./database')



app.listen(app.get('port'))
console.log('Server on Port', app.get( 'port' ))