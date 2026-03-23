const experience =require("../model/experience.model")



const CreateExperience=async(req,res)=>{
    try {
        
        const {role,company,location,duration,description}=req.body;
        // 🔥 VALIDATION
    if (
      !role ||
      !company ||
      !location ||
      !duration ||
      !description ||
      !Array.isArray(description) ||
      description.length === 0
      
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and description must not be empty",
      });
    }

        const newexperience=await experience.create({role,company,location,duration,description})
        res.status(200).json({message:"Experience created successfully", experience: newexperience})
    } catch (error) {
        console.log({"Experience Creating" : error});
    }
}

const deleteExperience = async (req, res) => {
    try {
      const { id } = req.params; // ✅ FIXED    
      const deletedExperience = await experience.findByIdAndDelete(id);
      res.status(200).json({ message: "Experience deleted successfully", experience: deletedExperience });
    } catch (error) {
      console.log({ "Error deleting experience": error });
    }
  };

  const updateExperience = async (req, res) => {
    try {
      const { id } = req.params; // ✅ FIXED
      const updatedExperience = await experience.findByIdAndUpdate(
        id,
        req.body, // ✅ directly use formData
        { returnDocument: "after" }
      );
      res.status(200).json({ message: "Experience updated successfully", experience: updatedExperience });
    } catch (error) {
      console.log({ "Error updating experience": error });}
    }

const GetExperience=async(req,res)=>{
    try {
        const experienceData=await experience.find()    
        res.status(200).json(experienceData)
    } catch (error) {
        console.log({"Experience Fetching" : error});   
        res.status(500).json({ message: "Server error", error });
    }}

    module.exports={CreateExperience,GetExperience,deleteExperience,updateExperience}