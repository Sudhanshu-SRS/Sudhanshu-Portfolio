const recommendation=require("../model/ClientRecomendation.model")


const CreateRecomendation=async(req,res)=>{
    try {
        const {name,role,company,image,recomendation,linkedin}=req.body;
        const newrecomendation=await recommendation.create({name,role,company,image,recomendation,linkedin})
        res.status(200).json({message:"Recomendation created successfully", recomendation: newrecomendation})
    } catch (error) {
        console.log({"Recomendation Creating" : error});
        res.status(500).json({message:"Error creating recomendation"});
    }   }


const GetRecomendation=async(req,res)=>{
    try {
        const recomendationData=await recommendation.find()
        res.status(200).json(recomendationData)
    } catch (error) {
        console.log({"Recomendation Fetching" : error});
        res.status(500).json({message:"Error fetching recomendation"});
    }
}

const deleteRecomendation = async (req, res) => {
    try {
      const { id } = req.params; // ✅ FIXED
        const deletedRecomendation = await recommendation.findByIdAndDelete(id);
        res.status(200).json({ message: "Recomendation deleted successfully", recomendation: deletedRecomendation });
    } catch (error) {
      console.log({ "Error deleting recomendation": error });
      res.status(500).json({message:"Error deleting recomendation"});
    }
    };


const updateRecomendation = async (req, res) => {
    try {
      const { id } = req.params; // ✅ FIXED
        const updatedRecomendation = await recommendation.findByIdAndUpdate(
        id,
        req.body, // ✅ directly use formData
        { returnDocument: "after" }
      );
      res.status(200).json({ message: "Recomendation updated successfully", recomendation: updatedRecomendation });
    }
        catch (error) {
        console.log({ "Error updating recomendation": error });
        res.status(500).json({message:"Error updating recomendation"});
    }
    }


module.exports={CreateRecomendation,GetRecomendation,deleteRecomendation,updateRecomendation}