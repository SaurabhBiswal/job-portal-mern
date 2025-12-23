import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const JobDetails = ({ user }) => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    api.get(`/job/${id}`).then(res => setJob(res.data.job));
    if (localStorage.getItem(`applied_${id}`)) setIsApplied(true);
  }, [id]);

  const handleApply = async () => {
    if (!user || user.role !== "jobseeker") return toast.error("Pehle Seeker login karo!");
    try {
      await api.post("/application/post", { 
        jobId: id, name: user.name, email: user.email, phone: user.phone || "123456", address: "India" 
      });
      setIsApplied(true);
      localStorage.setItem(`applied_${id}`, "true");
      toast.success("Applied Successfully! ✓");
    } catch (err) {
      toast.error(err.response?.data?.message || "Apply nahi ho paya");
    }
  };

  if (!job) return <div className="p-20 text-center font-bold">Fetching Job...</div>;

  return (
    <div className="p-10 max-w-4xl mx-auto mt-10 bg-white rounded-[40px] shadow-2xl border">
      <h1 className="text-5xl font-black">{job.title}</h1>
      <p className="text-blue-600 font-bold mb-8 uppercase italic">{job.category}</p>
      
      <div className="bg-gray-50 p-8 rounded-3xl mb-8">
        <h3 className="font-black text-lg mb-2">Job Description</h3>
        <p className="text-gray-600 leading-relaxed">{job.description}</p>
      </div>

      <button 
        onClick={handleApply}
        disabled={isApplied}
        className={`w-full py-5 rounded-2xl font-black text-xl transition-all ${
          isApplied ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-green-600 text-white hover:bg-black"
        }`}
      >
        {isApplied ? "ALREADY APPLIED ✓" : "APPLY FOR THIS JOB"}
      </button>
    </div>
  );
};
export default JobDetails;