import {useState,React} from 'react'

const Projects = () => {
     const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const addProject = () => {
    setProjects([...projects, { id: Date.now(), name }]);
    setName("");
  };
  return (
      <div>
      <h2 className="text-2xl mb-4">Projects</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
        className="p-2 text-black"
      />

      <button onClick={addProject} className="ml-2 bg-blue-500 px-4 py-2">
        Add
      </button>

      <ul className="mt-4">
        {projects.map((p) => (
          <li key={p.id} className="bg-gray-800 p-2 mt-2">
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Projects