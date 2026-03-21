import { useState, useEffect } from 'react';
import DataTable from '../components/shared/DataTable';
import Modal from '../components/shared/Modal';
import api from '../services/api';
import { Loader2, Plus, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', image: '', role: '', work: '', liveLink: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/projects');
      setData(res.data.Projects || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = async (e) => {
     const file = e.target.files[0];
     if(!file) return;
     setUploading(true);
     const FD = new FormData();
     FD.append('file', file);
     try {
       const res = await api.post('/upload', FD, {
         headers: { 'Content-Type': 'multipart/form-data' }
       });
       setFormData(prev => ({ ...prev, image: res.data.fileUrl || res.data.url }));
     } catch (err) {
       console.error(err);
     } finally {
       setUploading(false);
     }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await api.put(`/projects/update/${editingItem._id}`, formData);
      } else {
        await api.post('/projects/create', formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ title: '', image: '', role: '', work: '', liveLink: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/delete/${item._id}`);
        fetchData();
      } catch (err) {
         console.error(err);
      }
    }
  };

  const columns = [
    { header: 'Image', render: (row) => row.image ? <img src={row.image} alt={row.title} className="w-12 h-12 rounded object-cover border border-white/10" /> : <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center"><ImageIcon className="w-5 h-5 text-gray-500" /></div> },
    { header: 'Title', accessor: 'title' },
    { header: 'Role', accessor: 'role' },
    { header: 'Live Link', render: (row) => row.liveLink ? <a href={row.liveLink} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300">View</a> : 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your portfolio projects here.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setEditingItem(null); setFormData({ title: '', image: '', role: '', work: '', liveLink: '' }); setIsModalOpen(true); }}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium shadow-[0_4px_20px_rgba(147,51,234,0.3)] hover:shadow-[0_4px_25px_rgba(147,51,234,0.5)] transition-all"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Project
        </motion.button>
      </div>

      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs text-gray-400 font-medium mb-2 block tracking-wide">PROJECT IMAGE</label>
            <div className="flex items-center space-x-4">
              {formData.image && <img src={formData.image} alt="Preview" className="w-20 h-20 rounded-xl object-cover border border-white/10 shadow-lg" />}
              <div className="flex-1 relative">
                <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="flex items-center justify-center w-full py-4 px-4 rounded-xl border-2 border-dashed border-white/10 text-gray-400 bg-white/5 hover:text-white hover:border-purple-500 hover:bg-purple-500/5 transition-all cursor-pointer font-medium tracking-wide">
                   {uploading ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <ImageIcon className="w-5 h-5 mr-3" />}
                   {uploading ? 'Uploading to ImageKit...' : 'Upload Image'}
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 font-medium mb-2 block tracking-wide">TITLE</label>
            <input type="text" value={formData.title} onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))} className="w-full bg-[#1A1A20] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 font-medium mb-2 block tracking-wide">ROLE</label>
              <input type="text" value={formData.role || ''} onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))} className="w-full bg-[#1A1A20] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all" />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-2 block tracking-wide">LIVE LINK</label>
              <input type="text" value={formData.liveLink || ''} onChange={e => setFormData(prev => ({ ...prev, liveLink: e.target.value }))} className="w-full bg-[#1A1A20] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all" />
            </div>
          </div>
          <div>
             <label className="text-xs text-gray-400 font-medium mb-2 block tracking-wide">DESCRIPTION / WORK</label>
             <textarea value={formData.work || ''} onChange={e => setFormData(prev => ({ ...prev, work: e.target.value }))} className="w-full bg-[#1A1A20] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none h-28 resize-none transition-all custom-scrollbar"></textarea>
          </div>
          <button type="submit" disabled={loading || uploading} className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold tracking-wide flex flex-row items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
            {editingItem ? 'Save Changes' : 'Create Project'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Projects;
