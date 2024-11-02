require('./database')
const app=require('./server');

const PORT=4000;


app.listen(PORT,()=>{console.log(`send and runing en port ${PORT}`);})