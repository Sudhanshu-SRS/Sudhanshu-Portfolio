const certificate=require('../model/certificate.model')

const CreateCertificate=async(req,res)=>{
  try {
      
    const {image,title,year}=req.body;
    const newcertificate=await certificate.create({image,title,year})
    res.status(200).json({message:"Certificate created successfully", certificate: newcertificate})
  } catch (error) {
    console.log(error);
  }
}

const deleteCertificate = async (req, res) => {
  try {
    const { id, title } = req.body;

    let deleted;

    if (id) {
      // ✅ Priority: delete by ID
      deleted = await certificate.findByIdAndDelete(id);
    } else if (title) {
      // 🔍 Fallback: delete by title
      deleted = await certificate.findOneAndDelete({
        title: { $regex: title, $options: "i" }
      });
    } else {
      return res.status(400).json({
        message: "Please provide id or title"
      });
    }

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
    res.status(500).json({ message: "Server error", error });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const { id, title, newData } = req.body;

    let updated;

    if (id) {
      // ✅ Priority: update by ID
      updated = await certificate.findByIdAndUpdate(
        id,
        newData,
        { new: true }
      );
    } else if (title) {
      // 🔍 Fallback: update by title
      updated = await certificate.findOneAndUpdate(
        { title: { $regex: title, $options: "i" } },
        newData,
        { new: true }
      );
    } else {
      return res.status(400).json({
        message: "Please provide id or title"
      });
    }

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
    res.status(500).json({ message: "Server error", error });
  }
};

// 📄 Get all
const getCertificates = async (req, res) => {
    const data = await certificate.find();
    res.json(data);
};

module.exports={CreateCertificate,deleteCertificate,updateCertificate,getCertificates}