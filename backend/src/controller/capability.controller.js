const CapabilityModel = require('../model/capability.model');

exports.createCapability = async (req, res) => {
  try {
    const { title, description, iconSVG } = req.body;

    if (!title || !description || !iconSVG) {
      return res.status(400).json({
        success: false,
        message: "All fields including icon are required"
      });
    }

    const newCapability = await CapabilityModel.create({
      title,
      description,
      iconSVG
    });

    res.status(201).json({ success: true, newCapability });

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCapabilities = async (req, res) => {
  try {
    const Capabilities = await CapabilityModel.find();
    res.status(200).json({ success: true, Capabilities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCapability = async (req, res) => {
  try {
    const updated = await CapabilityModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCapability = async (req, res) => {
  try {
    await CapabilityModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Capability deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
