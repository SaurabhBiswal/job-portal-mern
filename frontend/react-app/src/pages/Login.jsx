import LoginCard from "../components/LoginCard";

export default function Login() {
  return (
    <div className="min-h-screen flex">
      {/* Job Seeker */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <LoginCard
          title="Job Seeker"
          subtitle="Find jobs and apply easily"
          buttonText="Login as Job Seeker"
        />
      </div>

      {/* Employer */}
      <div className="w-1/2 flex items-center justify-center bg-blue-50">
        <LoginCard
          title="Employer"
          subtitle="Post jobs and hire talent"
          buttonText="Login as Employer"
        />
      </div>
    </div>
  );
}
