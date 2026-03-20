import {useState,React} from 'react'
const Capabilities = () => {
     const [caps, setCaps] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: ""
  });

  const addCap = () => {
    setCaps([...caps, { ...form, id: Date.now() }]);
    setForm({ title: "", description: "", icon: "" });
  };
  return (
   <div>
      <h2 className="text-2xl mb-4">Capabilities</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="p-2 text-black mr-2"
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="p-2 text-black mr-2"
      />

      <input
        placeholder="SVG URL (ImageKit)"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
        className="p-2 text-black mr-2"
      />

      <button onClick={addCap} className="bg-blue-500 px-4 py-2">
        Add
      </button>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {caps.map((c) => (
          <div key={c.id} className="bg-gray-800 p-4 rounded">
            <img src={c.icon} alt="" className="w-10 mb-2" />
            <h3>{c.title}</h3>
            <p className="text-sm">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Capabilities