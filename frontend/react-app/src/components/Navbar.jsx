import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged Out!");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center py-4 px-10 bg-[#0a192f] text-white sticky top-0 z-50 shadow-2xl">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded font-black text-xl">E</div>
        <span className="font-black tracking-tighter text-xl uppercase italic">Engineers-Depot</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-bold">
        <Link to="/" className="hover:text-orange-500 transition">Home</Link>
        <Link to="/jobs" className="hover:text-orange-500 transition">Browse Jobs</Link>
        {user ? (
          <>
            {user.role === "employer" ? (
              <Link to="/job/post" className="hover:text-orange-500 transition">Post Job</Link>
            ) : (
              <Link to="/applications/me" className="hover:text-orange-500 transition">My Applications</Link>
            )}
            <button onClick={handleLogout} className="bg-orange-500 px-6 py-2 rounded-full hover:bg-orange-600 transition">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-orange-500 px-6 py-2 rounded-full hover:bg-orange-600 transition">Login</Link>
        )}
      </div>
    </nav>
  );
};
export default NavBar;