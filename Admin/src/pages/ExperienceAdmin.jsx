import { useEffect, useState } from "react";
import api from "../services/api";

const ExperienceAdmin = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    role: "",
    company: "",
    location: "",
    duration: "",
    points: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get("/experience");
    setData(res.data);
  };

  const handleSubmit = async () => {
  const payload = {
  role: form.role,
  company: form.company,
  location: form.location,
  duration: form.duration,
  description: form.points.split("\n"),
};
if (
  !form.role ||
  !form.company ||
  !form.location ||
  !form.duration ||
  !form.points.trim()
) {
  alert("Please fill all fields");
  return;
}
 try {
  if (editId) {
    await api.put(`/experience/${editId}`, payload);
  } else {
    await api.post("/experience", payload);
  }
} catch (err) {
  console.error("ADD ERROR:", err.response?.data || err.message);
}

    setForm({
      role: "",
      company: "",
      location: "",
      duration: "",
      points: "",
    });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      ...item,
      points: item.description.join("\n"),
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/experience/${id}`);
    fetchData();
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-6">Experience Admin</h1>

      {/* FORM */}
      <div className="bg-white/5 p-6 rounded-xl mb-10 space-y-4">

        <input placeholder="Role" value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded"
        />

        <input placeholder="Company" value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded"
        />

        <input placeholder="Location" value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded"
        />

        <input placeholder="Duration" value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded"
        />

        <textarea
          placeholder="Points (one per line)"
          value={form.points}
          onChange={(e) => setForm({ ...form, points: e.target.value })}
          className="w-full p-3 bg-black border border-white/10 rounded h-32"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-indigo-600 rounded"
        >
          {editId ? "Update" : "Add"} Experience
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item._id} className="bg-white/5 p-4 rounded-xl flex justify-between items-center">

            <div>
              <h3 className="font-bold">{item.role}</h3>
              <p className="text-sm text-gray-400">{item.company}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => handleEdit(item)} className="text-blue-400">
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)} className="text-red-400">
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ExperienceAdmin;