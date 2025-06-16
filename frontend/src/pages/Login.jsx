import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save token, redirect, etc.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      console.log("Login successful:", data);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

   const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      // Optionally log in the user right after registration:
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data));
      // console.log("Register response:", data);
      // Reset form and switch to login mode
      setIsRegister(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setSuccess("Account created! Please log in! :)")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={isRegister ? handleRegister : handleLogin} className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow space-y-4">
      <h1>Welcome to Swing Notes!</h1>
      <h2 className="text-2xl font-bold text-center">{isRegister ? "Create Account" : "Login"}</h2>
      {success && <p className="text-green-600 text-sm">{success}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

       {isRegister && (
        <div className="labelInput">
          <label>Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
      )}

      <div className="labelInput">
        <label className="">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="labelInput">
        <label className="">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="formBtn">
        {isRegister ? "Create Account" : "Login"}
      </button>

      <div className="text-center mt-2">
        {isRegister ? (
          <span>
            Already have an account?{" "}
            <button type="button" className="formBtn" onClick={() => setIsRegister(false)}>
              Login
            </button>
          </span>
        ) : (
          <span>
            Don't have an account?{" "}
            <button type="button" className="formBtn" onClick={() => setIsRegister(true)}>
              Create Account
            </button>
          </span>
        )}
      </div>
    </form>
  );
}
