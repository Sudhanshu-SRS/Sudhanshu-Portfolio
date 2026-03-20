import {useState,React} from 'react'

 
const Certificates = () => {
    const [certs, setCerts] = useState([]);
  const [title, setTitle] = useState("");

  const addCert = () => {
    setCerts([...certs, { id: Date.now(), title }]);
    setTitle("");
  };

  const deleteCert = (id) => {
    setCerts(certs.filter((c) => c.id !== id));
  };
  return (
    <div>
      <h2 className="text-2xl mb-4">Certificates</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Certificate Title"
        className="p-2 text-black"
      />
      <button onClick={addCert} className="ml-2 bg-blue-500 px-4 py-2">
        Add
      </button>

      <ul className="mt-4 space-y-2">
        {certs.map((c) => (
          <li key={c.id} className="flex justify-between bg-gray-800 p-2">
            {c.title}
            <button onClick={() => deleteCert(c.id)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Certificates