
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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [role, setRole] = useState("");

  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get languages from backend
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await api.get("/languages");

        if (Array.isArray(response.data)) {
          setLanguages(response.data);
        } else if (Array.isArray(response.data?.data)) {
          setLanguages(response.data.data);
        } else if (Array.isArray(response.data?.languages)) {
          setLanguages(response.data.languages);
        } else {
          setLanguages([]);
        }
      } catch (err) {
        console.error("Failed to fetch languages:", err);
        setError("Unable to load languages.");
      }
    };

    fetchLanguages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!username || !email || !password || !nativeLanguage || !role) {
      setError("Please fill in all fields.");
      return;
    }

    // Backend requires minimum 6 characters
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        username: username,
        email: email,
        password: password,
        nativeLanguage: nativeLanguage,
        role: role,
      });

      alert("Registration successful!");

      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Registration failed. Please check your details."
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
            />
          </div>

          {/* Native Language */}
          <div className="form-group">
            <label>Native Language</label>

            <select
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
            >
              <option value="">Select Native Language</option>

              {languages.map((language) => (
                <option
                  key={language.id || language.languageName}
                  value={language.languageName}
                >
                  {language.languageName}
                </option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="LEARNER">Learner</option>
              <option value="LINGUIST">Linguist</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Register Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;