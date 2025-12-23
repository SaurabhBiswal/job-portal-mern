import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Job Seeker</h2>
        <Link
          to="/login/jobseeker"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center bg-blue-50">
        <h2 className="text-2xl font-bold mb-4">Employer</h2>
        <Link
          to="/login/employer"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
