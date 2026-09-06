
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../../services/api";

// function Register() {
//     const navigate = useNavigate();

//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [nativeLanguage, setNativeLanguage] = useState("");
//     const [languages, setLanguages] = useState([]);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchLanguages = async () => {
//             try {
//                 const response = await api.get("/languages");

//                 const data = response?.data;

//                 if (Array.isArray(data)) {
//                     setLanguages(data);
//                 } else if (Array.isArray(data?.data)) {
//                     setLanguages(data.data);
//                 } else if (Array.isArray(data?.languages)) {
//                     setLanguages(data.languages);
//                 } else {
//                     setLanguages([]);
//                 }
//             } catch (err) {
//                 console.error("Failed to load languages:", err);
//                 setLanguages([]);
//             }
//         };

//         fetchLanguages();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setError("");
//         setLoading(true);

//         try {
//             await api.post("/auth/register", {
//                 username: username,
//                 email: email,
//                 password: password,
//                 nativeLanguage: nativeLanguage,
//             });

//             navigate("/login");
//         } catch (err) {
//             setError(
//                 err?.response?.data?.message ||
//                 err?.message ||
//                 "Registration failed"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="page-container">
//             <div className="form-container">
//                 <h1>Register</h1>

//                 {error && (
//                     <div className="error-message">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="username">
//                         Username
//                     </label>

//                     <input
//                         id="username"
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) =>
//                             setUsername(e.target.value)
//                         }
//                         required
//                     />

//                     <label htmlFor="email">
//                         Email
//                     </label>

//                     <input
//                         id="email"
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) =>
//                             setEmail(e.target.value)
//                         }
//                         required
//                     />

//                     <label htmlFor="password">
//                         Password
//                     </label>

//                     <input
//                         id="password"
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) =>
//                             setPassword(e.target.value)
//                         }
//                         required
//                     />

//                     <label htmlFor="nativeLanguage">
//                         Native Language
//                     </label>

//                     <select
//                         id="nativeLanguage"
//                         value={nativeLanguage}
//                         onChange={(e) =>
//                             setNativeLanguage(e.target.value)
//                         }
//                         required
//                     >
//                         <option value="">
//                             Select Native Language
//                         </option>

//                         {languages.map((language) => (
//                             <option
//                                 key={language.id}
//                                 value={language.id}
//                             >
//                                 {language.name}
//                             </option>
//                         ))}
//                     </select>

//                     <button
//                         type="submit"
//                         className="primary-button"
//                         disabled={loading}
//                     >
//                         {loading
//                             ? "Registering..."
//                             : "Register"}
//                     </button>
//                 </form>

//                 <p>
//                     Already have an account?{" "}
//                     <Link to="/login">
//                         Login
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Register;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// function Register() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [nativeLanguage, setNativeLanguage] = useState("");
//   const [role, setRole] = useState("LEARNER");

//   const [languages, setLanguages] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Fetch available languages
//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         const response = await api.get("/languages");
//         const data = response?.data;

//         if (Array.isArray(data)) {
//           setLanguages(data);
//         } else {
//           setLanguages([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch languages:", err);
//         setLanguages([]);
//       }
//     };

//     fetchLanguages();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     // Basic validation
//     if (!username || !email || !password || !nativeLanguage || !role) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     try {
//       await api.post("/auth/register", {
//         username,
//         email,
//         password,
//         nativeLanguage,
//         role,
//       });

//       setSuccess("Registration successful! Redirecting to login...");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     } catch (err) {
//       console.error("Registration failed:", err);

//       const message =
//         err?.response?.data?.message ||
//         err?.response?.data ||
//         "Registration failed. Please try again.";

//       setError(message);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>

//       {error && <div className="error-message">{error}</div>}

//       {success && <div className="success-message">{success}</div>}

//       <form onSubmit={handleSubmit}>

//         {/* Username */}
//         <div className="form-group">
//           <label htmlFor="username">Username</label>

//           <input
//             id="username"
//             type="text"
//             placeholder="Enter username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="form-group">
//           <label htmlFor="email">Email</label>

//           <input
//             id="email"
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="form-group">
//           <label htmlFor="password">Password</label>

//           <input
//             id="password"
//             type="password"
//             placeholder="Minimum 6 characters"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             minLength={6}
//             required
//           />
//         </div>

//         {/* Native Language */}
//         <div className="form-group">
//           <label htmlFor="nativeLanguage">Native Language</label>

//           <select
//             id="nativeLanguage"
//             value={nativeLanguage}
//             onChange={(e) => setNativeLanguage(e.target.value)}
//             required
//           >
//             <option value="">Select language</option>

//             {languages.map((language) => (
//               <option
//                 key={language.id || language.code || language.name}
//                 value={language.name || language.code}
//               >
//                 {language.name || language.code}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Role */}
//         <div className="form-group">
//           <label htmlFor="role">Role</label>

//           <select
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="LEARNER">LEARNER</option>
//             <option value="LINGUIST">LINGUIST</option>
//             <option value="ADMIN">ADMIN</option>
//           </select>
//         </div>

//         {/* Submit */}
//         <button type="submit">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [role, setRole] = useState("LEARNER");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
        nativeLanguage,
        role,
      });

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join LangLoop and start learning</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {success && <div className="success-message">{success}</div>}

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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              placeholder="Create a password"
              minLength={6}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nativeLanguage">Native Language</label>
            <select
              id="nativeLanguage"
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
              required
            >
              <option value="">Select your language</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="LEARNER">Learner</option>
              <option value="LINGUIST">Linguist</option>
            </select>
          </div>

          <button type="submit" className="primary-button auth-submit">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>{" "}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

