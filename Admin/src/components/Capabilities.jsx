import { useState } from "react";

const Capabilities = () => {
  const [caps, setCaps] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
  });

  const addCap = () => {
    if (!form.title || !form.description || !form.icon) return;

    setCaps([{ ...form, id: Date.now() }, ...caps]);
    setForm({ title: "", description: "", icon: "" });
  };

  return (
    <div className="space-y-8">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Capabilities</h1>
        <p className="text-gray-500 text-sm">
          Showcase your skills & strengths visually
        </p>
      </div>

      {/* ================= FORM ================= */}
      <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500/40 to-purple-500/40">

        <div className="bg-white rounded-2xl p-6 shadow-lg">

          <div className="grid md:grid-cols-2 gap-4">

            {/* Title */}
            <input
              placeholder="Capability Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Icon URL */}
            <input
              placeholder="SVG Icon URL (ImageKit)"
              value={form.icon}
              onChange={(e) =>
                setForm({ ...form, icon: e.target.value })
              }
              className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Description */}
          <textarea
            placeholder="Short Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="mt-4 w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            rows={3}
          />

          {/* Preview */}
          {form.icon && (
            <div className="mt-4 flex items-center gap-3">
              <img
                src={form.icon}
                className="w-10 h-10 object-contain"
              />
              <span className="text-sm text-gray-500">
                Icon Preview
              </span>
            </div>
          )}

          {/* Button */}
          <button
            onClick={addCap}
            className="mt-5 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:scale-105 transition"
          >
            + Add Capability
          </button>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {caps.map((c) => (
          <div
            key={c.id}
            className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition relative"
          >

            {/* Delete Button */}
            <button
              onClick={() =>
                setCaps(caps.filter((x) => x.id !== c.id))
              }
              className="absolute top-3 right-3 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>

            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
              <img
                src={c.icon}
                className="w-6 h-6 object-contain"
              />
            </div>

            {/* Content */}
            <h3 className="font-semibold text-lg mb-1">
              {c.title}
            </h3>

            <p className="text-sm text-gray-500">
              {c.description}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Capabilities;