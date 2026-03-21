import { useState } from "react";

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    obtainby: "",
    year: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm((p) => ({ ...p, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const addCert = () => {
    if (!form.title) return;

    setCerts([
      {
        id: Date.now(),
        ...form,
        image: preview,
      },
      ...certs,
    ]);

    setForm({ title: "", obtainby: "", year: "", image: null });
    setPreview(null);
  };

  const deleteCert = (id) => {
    setCerts(certs.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Certificates
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and showcase your achievements
        </p>
      </div>

      {/* ================= FORM ================= */}
      <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500/40 to-purple-500/40">

        <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-xl">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Certificate Title"
              className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="obtainby"
              value={form.obtainby}
              onChange={handleChange}
              placeholder="Issued By"
              className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year"
              type="number"
              className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <label className="p-3 border rounded-lg cursor-pointer text-gray-500 hover:bg-gray-50">
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImage}
              />
            </label>

          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                className="w-32 h-32 object-cover rounded-xl shadow"
              />
            </div>
          )}

          <button
            onClick={addCert}
            className="mt-5 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 transition"
          >
            + Add Certificate
          </button>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {certs.map((c) => (
          <div
            key={c.id}
            className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            {/* Image */}
            {c.image && (
              <img
                src={c.image}
                className="w-full h-44 object-cover group-hover:scale-105 transition"
              />
            )}

            {/* Overlay delete */}
            <button
              onClick={() => deleteCert(c.id)}
              className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.obtainby}</p>
              <p className="text-xs text-gray-400">{c.year}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Certificates;