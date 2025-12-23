import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-5 bg-white border-b sticky top-0 z-50 shadow-sm">
      <Link to="/" className="text-2xl font-black text-blue-600">JOBPORTAL</Link>
      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <Link to={user.role === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard'} className="font-bold">Dashboard</Link>
            <button onClick={logout} className="bg-red-500 text-white px-5 py-2 rounded-xl font-bold">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold">Login</Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;