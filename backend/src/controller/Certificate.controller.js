const certificate=require('../model/certificate.model')

const CreateCertificate=async(req,res)=>{
  try {
      
    const {image,title,year,obtainby}=req.body;
    const newcertificate=await certificate.create({image,title,year,obtainby})
    res.status(200).json({message:"Certificate created successfully", certificate: newcertificate})
  } catch (error) {
    console.log(error);
  }
}

const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params; // ✅ FIXED

    console.log("Deleting ID:", id); // debug

    const deleted = await certificate.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Certificate not found"
      });
    }

    res.json({
      message: "Certificate deleted successfully",
      deleted
    });

  } catch (error) {
    console.error("DELETE ERROR:", error); // 🔥 IMPORTANT
    res.status(500).json({ message: "Server error", error });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params; // ✅ FIX

    const updated = await certificate.findByIdAndUpdate(
      id,
      req.body, // ✅ directly use formData
      { returnDocument: "after" }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Certificate not found"
      });
    }

    res.json({
      message: "Certificate updated successfully",
      updated
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 📄 Get all
const getCertificates = async (req, res) => {
    const data = await certificate.find();
    res.json(data);
};

module.exports={CreateCertificate,deleteCertificate,updateCertificate,getCertificates}