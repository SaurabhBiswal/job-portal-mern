import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function ApplicationModal({ jobId, onClose }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/application/post", { ...formData, jobId });
      toast.success(data.message);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">Quick Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email" required className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="text" placeholder="Phone" required className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <textarea placeholder="Cover Note / Address" className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, address: e.target.value})} />
          
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold">Submit</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 py-3 rounded-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}