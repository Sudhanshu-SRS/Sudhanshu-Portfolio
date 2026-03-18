const Admin=require('../model/User.model');
const bcrypt=require('bcryptjs')


const CreateAdmin=async()=>{

   try {
     const ExistingAdmin=await Admin.findOne()

    if(ExistingAdmin) {
        console.log("Admin Already Exist")
    return } 


    const hashpassword= await bcrypt.hash(process.env.ADMIN_PASSWORD,10)

    await  Admin.create({
        Email:process.env.ADMIN_EMAIL,
        Password:hashpassword
    })

    

    console.log("ADMIN Created SUCCESFULLY");
   } catch (error) {
    console.log(error);
   }
  

}

module.exports=CreateAdmin;