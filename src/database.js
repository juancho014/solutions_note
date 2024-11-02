const mongoose= require('mongoose');
const URI='mongodb://127.0.0.1:27017/New-Notes';
mongoose.set('strictQuery', false);

mongoose.connect(URI,{

}).then(db=>{console.log('conectado a la base de datos');})
   .catch(err=>{console.log(err)})