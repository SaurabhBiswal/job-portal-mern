import { useState } from "react";
import api from "../api/axios";

export default function ApplicationModal({ jobId, onClose }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend ko pura data bhej rahe hain
      const { data } = await api.post("/application/post", { ...formData, jobId });
      alert(data.message);
      onClose();
    } catch (err) {
      // Agar error aaye toh alert dikhao
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for Position</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email Address" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="number" placeholder="Phone Number" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <textarea placeholder="Address" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, address: e.target.value})} />
          
          <div className="flex gap-4 mt-6">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Submit</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}