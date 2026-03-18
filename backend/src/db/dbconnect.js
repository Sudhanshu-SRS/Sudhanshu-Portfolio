const mongo=require('mongoose')

async function ConnectDB(){
   try {
     await mongo.connect(process.env.MONO_URI)
    console.log("MonoGO DB Connected");
   } catch (error) {
    console.log(error);
   }
}




module.exports=ConnectDB;