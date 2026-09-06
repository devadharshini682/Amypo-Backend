// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import api from "../../services/api";
// import { loginSuccess } from "../../store/slices/authSlice";

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");

//     if (!username.trim()) {
//       setError("Username is required.");
//       return;
//     }

//     if (!password) {
//       setError("Password is required.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await api.post("/auth/login", {
//         username,
//         password,
//       });

//       const data = response.data;

//       const token = data.token || data.accessToken;

//       const user = data.user || {
//         username: data.username || username,
//         role: data.role || "LEARNER",
//         id: data.id,
//       };

//       dispatch(
//         loginSuccess({
//           token,
//           user,
//         })
//       );

//       navigate("/dashboard");
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Invalid username or password."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h1>LangLoop</h1>

//         <h2>Login to LangLoop</h2>

//         <form onSubmit={handleSubmit}>
//           <label htmlFor="username">
//             Username
//           </label>

//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter username"
//           />

//           <label htmlFor="password">
//             Password
//           </label>

//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter password"
//           />

//           {error && (
//             <p className="error-message">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="primary-button"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="auth-link">
//           Don't have an account?{" "}
//           <Link to="/register">
//             Create Account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import { loginSuccess } from "../../store/slices/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const data = response.data;

      const token = data.token || data.accessToken;
      const user = data.user || data;

      if (token) {
        localStorage.setItem("langloop_token", token);
      }

      localStorage.setItem("user", JSON.stringify(user));

      dispatch(
        loginSuccess({
          token,
          user,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Invalid username or password"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Login to continue to LangLoop</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="primary-button auth-submit">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>{" "}
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

