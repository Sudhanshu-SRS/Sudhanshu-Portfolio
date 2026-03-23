const About = require("../model/About.model");

// ✅ CREATE (or overwrite if exists)
const CreateAbout = async (req, res) => {
  try {
    const { image, aboutme, yearExperience, awards, hackhthon, whatsapp, email } = req.body;

    if (!aboutme) {
      return res.status(400).json({ message: "About text is required" });
    }

    // 🔥 Only one about allowed (overwrite existing)
    const existing = await About.findOne();

    let saved;
    if (existing) {
      saved = await About.findByIdAndUpdate(
        existing._id,
        req.body,
        { returnDocument: "after" }
      );
    } else {
      saved = await About.create({
        image,
        aboutme,
        yearExperience,
        awards,
        hackhthon,
        whatsapp,
        email,
      });
    }

    res.status(201).json({
      message: "About saved successfully",
      data: saved,
    });

  } catch (error) {
    console.error("CreateAbout error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



// ✅ GET (single object instead of array)
const GetAbout = async (req, res) => {
  try {
    const about = await About.findOne(); // 🔥 better than find()

    if (!about) {
  return res.status(200).json(null);
}
    res.status(200).json(about);

  } catch (error) {
    console.error("GetAbout error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



// ✅ UPDATE
const UpdateAbout = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await About.findByIdAndUpdate(
      id,
      req.body,
      { returnDocument: "after" }
    );

    if (!updated) {
      return res.status(404).json({ message: "About not found" });
    }

    res.status(200).json({
      message: "Updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("UpdateAbout error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { CreateAbout, GetAbout, UpdateAbout };