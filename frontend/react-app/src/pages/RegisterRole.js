import { useNavigate } from "react-router-dom";

const RegisterRole = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
      <h2>Create your account</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "40px" }}>
        <button onClick={() => navigate("/register/employer")}>
          👨‍💼 I’m an Employer
        </button>

        <button onClick={() => navigate("/register/jobseeker")}>
          👨‍🎓 I’m a Job Seeker
        </button>
      </div>
    </div>
  );
};

export default RegisterRole;
