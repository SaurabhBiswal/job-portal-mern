const API = "http://localhost:3000";

function register() {
  fetch(`${API}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: regUser.value,
      password: regPass.value
    })
  })
  .then(res => res.text())
  .then(alert);
}

function login() {
  fetch(`${API}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: loginUser.value,
      password: loginPass.value
    })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    if (data.role === "EMPLOYER") {
      window.location.href = "dashboard-employer.html";
    } else {
      window.location.href = "jobs.html";
    }
  })
  .catch(() => alert("Login failed"));
}

