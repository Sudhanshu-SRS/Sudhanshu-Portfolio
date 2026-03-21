import { useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    role: "",
    work: "",
    liveLink: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ================= IMAGE ================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm((p) => ({ ...p, image: file }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ================= ADD ================= */
  const addProject = () => {
    if (!form.title) return;

    setProjects([
      {
        id: Date.now(),
        ...form,
        image: preview,
      },
      ...projects,
    ]);

    setForm({
      title: "",
      role: "",
      work: "",
      liveLink: "",
      image: null,
    });
    setPreview(null);
  };

  /* ================= DELETE ================= */
  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-gray-500 text-sm">
          Showcase your best work
        </p>
      </div>

      {/* ================= FORM ================= */}
      <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500/40 to-purple-500/40">

        <div className="bg-white rounded-2xl p-6 shadow-lg">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Your Role (Frontend, Fullstack...)"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="liveLink"
              value={form.liveLink}
              onChange={handleChange}
              placeholder="Live Project Link"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <label className="p-3 border rounded-lg cursor-pointer text-gray-500 hover:bg-gray-50">
              Upload Image
              <input type="file" hidden onChange={handleImage} />
            </label>
          </div>

          {/* Work Description */}
          <textarea
            name="work"
            value={form.work}
            onChange={handleChange}
            placeholder="What you did in this project..."
            className="mt-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
          />

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              className="mt-4 w-40 h-28 object-cover rounded-lg shadow"
            />
          )}

          {/* Button */}
          <button
            onClick={addProject}
            className="mt-5 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:scale-105 transition"
          >
            + Add Project
          </button>
        </div>
      </div>

      {/* ================= PROJECT GRID ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((p) => (
          <div
            key={p.id}
            className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            {/* Image */}
            {p.image && (
              <img
                src={p.image}
                className="w-full h-44 object-cover group-hover:scale-105 transition"
              />
            )}

            {/* Delete */}
            <button
              onClick={() => deleteProject(p.id)}
              className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>

            {/* Content */}
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-lg">{p.title}</h3>

              <p className="text-xs text-blue-500">{p.role}</p>

              <p className="text-sm text-gray-500 line-clamp-2">
                {p.work}
              </p>

              {p.liveLink && (
                <a
                  href={p.liveLink}
                  target="_blank"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Projects;