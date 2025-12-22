const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

/* ===== TEMP BROWSER REGISTER PAGE ===== */
router.get("/register", (req, res) => {
  res.send(`
    <h2>Register</h2>
    <form method="POST" action="/api/auth/register">
      <input name="name" placeholder="Name" /><br/><br/>
      <input name="email" placeholder="Email" /><br/><br/>
      <input name="password" type="password" placeholder="Password" /><br/><br/>
      <select name="role">
        <option value="jobseeker">Job Seeker</option>
        <option value="employer">Employer</option>
      </select><br/><br/>
      <button type="submit">Register</button>
    </form>
  `);
});

/* ===== API ROUTES ===== */
router.post("/register", register);
router.post("/login", login);

module.exports = router;




