require('dotenv').config()
const dns=require('dns')
dns.setServers(['8.8.8.8','2001:4860:4860::8888'])
const app=require('./src/app.js')
const DB=require('./src/db/dbconnect.js')
const Port=process.env.Port||5000;
const CreateAdmin=require('./src/utils/admincreator.js')

DB().then(()=>{
CreateAdmin();
app.listen(Port,()=>{
    console.log(`Server Running On ${Port}` );
})

});


