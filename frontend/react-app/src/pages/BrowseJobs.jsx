import React from "react";

const BrowseJobs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-[#0a192f]">Available Jobs</h2>
        <p className="text-gray-500 mt-2 font-medium">Explore the latest opportunities from top companies.</p>
        
        <div className="grid gap-6 mt-12">
          {/* Card Example */}
          <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all border-l-8 border-l-orange-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-[#0a192f]">Software Engineer</h3>
                <p className="text-gray-400 font-bold mt-1">Tech Solutions Inc. • Mumbai</p>
              </div>
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-bold text-sm">Full Time</span>
            </div>
            <p className="mt-4 text-gray-500 leading-relaxed">Loading more jobs from our database... Stay tuned!</p>
            <button className="mt-6 bg-[#0a192f] text-white px-8 py-2 rounded-xl font-bold hover:bg-orange-500 transition">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BrowseJobs;