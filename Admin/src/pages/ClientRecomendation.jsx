import { useEffect, useState } from "react";
import api from "../services/api";

const ClientRecomAdmin = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    image: "",
    recomendation: "",
      linkedin: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/clientRecom");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    // 🔥 VALIDATION
    if (
      !form.name ||
      !form.role ||
      !form.company ||
     
      !form.recomendation.trim() ||
      !form.linkedin.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await api.put(`/clientRecom/${editId}`, form);
      } else {
        await api.post("/clientRecom", form);
      }

      // RESET
      setForm({
        name: "",
        role: "",
        company: "",
        image: "",
        recomendation: "",
        linkedin: "",
      });

      setEditId(null);
      fetchData();

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm(item);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/clientRecom/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">Client Recommendations</h1>

      {/* 🔥 FORM */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10 space-y-4 backdrop-blur">

        <input
          placeholder="Client Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded-lg"
        />

        <input
          placeholder="Role (e.g. CEO, Manager)"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded-lg"
        />

        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded-lg"
        />

        <input
          placeholder="Image URL (ImageKit)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded-lg"
        />

        <input
          placeholder="LinkedIn Profile URL"
          value={form.linkedin}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded-lg"
        />

        <textarea
          placeholder="Client Recommendation"
          value={form.recomendation}
          onChange={(e) =>
            setForm({ ...form, recomendation: e.target.value })
          }
          className="w-full p-3 bg-black border border-white/10 rounded-lg h-32"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg font-semibold hover:scale-[1.02] transition"
        >
          {editId ? "Update Recommendation" : "Add Recommendation"}
        </button>
      </div>

      {/* 🔥 LIST */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">

              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border border-white/10"
              />

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">
                  {item.role} • {item.company}
                </p>
              </div>

            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-400 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ClientRecomAdmin;