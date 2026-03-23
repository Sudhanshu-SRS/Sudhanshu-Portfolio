import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
 const [uploading, setUploading] = useState(false);
  // 🔥 FORM STATE
  const [form, setForm] = useState({
    image: "",
    aboutme: "",
    yearExperience: "",
    awards: "",
    hackhthon: "",
    whatsapp: "",
    email: ""
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  // ✅ FETCH DATA
  const fetchAbout = async () => {
    try {
      const res = await api.get("/about");
      setAbout(res.data);

      // 🔥 AUTO FILL FORM IF DATA EXISTS
      if (res.data) {
        setForm({
          image: res.data.image || "",
          aboutme: res.data.aboutme || "",
          yearExperience: res.data.yearExperience || "",
          awards: res.data.awards || "",
          hackhthon: res.data.hackhthon || "",
          whatsapp: res.data.whatsapp || "",
          email: res.data.email || ""
        });
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SAVE (CREATE / UPDATE)
  const handleSubmit = async () => {
    try {
      await api.post("/about", form);
      alert("✅ About Saved Successfully");
      fetchAbout(); // refresh UI
    } catch (err) {
      console.error(err);
      alert("❌ Error saving data");
    }
  };

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="text-gray-400 text-center py-20">
        Loading About...
      </div>
    );
  }


const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    setUploading(true);

    const res = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // 🔥 IMPORTANT: backend must return URL
    setForm((prev) => ({
      ...prev,
      image: res.data.url,
    }));

  } catch (err) {
    console.error("Upload failed", err);
  } finally {
    setUploading(false);
  }
};
  return (
    <section className="bg-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-20 min-h-screen">

  {/* 🔥 ADMIN FORM */}
  <div className="max-w-4xl mx-auto mb-16 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-lg">

    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
      Edit About
    </h2>

    {/* IMAGE UPLOAD */}
    <div className="mb-6">
      <label className="text-sm text-gray-400 mb-2 block">Profile Image</label>

      <input
        type="file"
        onChange={handleImageUpload}
        className="w-full p-3 bg-black border border-white/10 rounded-lg cursor-pointer"
      />

      {uploading && (
        <p className="text-sm text-indigo-400 mt-2 animate-pulse">
          Uploading image...
        </p>
      )}

      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          className="mt-4 w-full h-40 object-cover rounded-xl border border-white/10"
        />
      )}
    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <input
        name="yearExperience"
        value={form.yearExperience}
        onChange={handleChange}
        type="number"
        placeholder="Years Experience"
        className="p-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      <input
        name="awards"
        value={form.awards}
        onChange={handleChange}
        type="number"
        placeholder="Awards"
        className="p-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      <input
        name="hackhthon"
        value={form.hackhthon}
        onChange={handleChange}
        type="number"
        placeholder="Hackathons"
        className="p-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      <input
        name="whatsapp"
        value={form.whatsapp}
        onChange={handleChange}
        type="number"
        placeholder="WhatsApp Number"
        className="p-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        placeholder="Email Address"
        className="p-3 bg-black border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>

    {/* ABOUT TEXT */}
    <textarea
      name="aboutme"
      value={form.aboutme}
      onChange={handleChange}
      placeholder="Write something about yourself..."
      className="w-full mt-6 p-4 bg-black border border-white/10 rounded-xl h-32 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
    />

    {/* BUTTON */}
    <button
      disabled={uploading}
      onClick={handleSubmit}
      className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all disabled:opacity-50"
    >
      {uploading ? "Uploading..." : "Save About 🚀"}
    </button>
  </div>

  {/* 🔥 DISPLAY SECTION */}
  {about ? (
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <img
          src={about.image}
          alt="About"
          className="rounded-3xl w-full h-[300px] sm:h-[450px] object-cover shadow-xl"
        />

        <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-2xl -z-10"></div>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        <h2 className="text-3xl sm:text-5xl font-bold">
          About Me
        </h2>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          {about.aboutme}
        </p>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4">

          {[
            { label: "Experience", value: about.yearExperience + "+" },
            { label: "Awards", value: about.awards },
            { label: "Hackathons", value: about.hackhthon }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 text-center hover:bg-white/10 transition"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-indigo-400">
                {item.value || 0}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                {item.label}
              </p>
            </div>
          ))}

        </div>
      </motion.div>
    </div>
  ) : (
    <p className="text-gray-500 text-center mt-10">
      No About Data Found — Add using form above 👆
    </p>
  )}
</section>
  );
}