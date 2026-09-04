// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import api from "../../services/api";

// function Register() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [languageId, setLanguageId] = useState("");

//   const [languages, setLanguages] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         const response = await api.get("/languages");

//         setLanguages(response.data || []);
//       } catch (err) {
//         console.error("Unable to load languages");
//       }
//     };

//     fetchLanguages();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");
//     setSuccess("");

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

//       await api.post("/auth/register", {
//         username,
//         password,
//         languageId: languageId || null,
//       });

//       setSuccess(
//         "Account created successfully. Redirecting..."
//       );

//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Registration failed."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h1>LangLoop</h1>

//         <h2>Create Account</h2>

//         <form onSubmit={handleSubmit}>
//           <label htmlFor="username">
//             Username
//           </label>

//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//           />

//           <label htmlFor="password">
//             Password
//           </label>

//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//           />

//           <label htmlFor="language">
//             Native Language
//           </label>

//           <select
//             id="language"
//             value={languageId}
//             onChange={(e) => setLanguageId(e.target.value)}
//           >
//             <option value="">
//               Select Language
//             </option>

//             {languages.map((language) => (
//               <option
//                 key={language.id}
//                 value={language.id}
//               >
//                 {language.name ||
//                   language.languageName ||
//                   language.title}
//               </option>
//             ))}
//           </select>

//           {error && (
//             <p className="error-message">
//               {error}
//             </p>
//           )}

//           {success && (
//             <p className="success-message">
//               {success}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="primary-button"
//           >
//             {loading
//               ? "Creating..."
//               : "Create Account"}
//           </button>
//         </form>

//         <p className="auth-link">
//           Already have an account?{" "}
//           <Link to="/login">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

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
//                 const response = await api.get();

//                 setLanguages(response?.data || []);
//             } catch (err) {
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
//             await api.post({
//                 username,
//                 email,
//                 password,
//                 nativeLanguage,
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
//                                 value={
//                                     language.id ||
//                                     language.name
//                                 }
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
    const [languages, setLanguages] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await api.get("/languages");

                const data = response?.data;

                if (Array.isArray(data)) {
                    setLanguages(data);
                } else if (Array.isArray(data?.data)) {
                    setLanguages(data.data);
                } else if (Array.isArray(data?.languages)) {
                    setLanguages(data.languages);
                } else {
                    setLanguages([]);
                }
            } catch (err) {
                console.error("Failed to load languages:", err);
                setLanguages([]);
            }
        };

        fetchLanguages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await api.post("/auth/register", {
                username: username,
                email: email,
                password: password,
                nativeLanguage: nativeLanguage,
            });

            navigate("/login");
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1>Register</h1>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="nativeLanguage">
                        Native Language
                    </label>

                    <select
                        id="nativeLanguage"
                        value={nativeLanguage}
                        onChange={(e) =>
                            setNativeLanguage(e.target.value)
                        }
                        required
                    >
                        <option value="">
                            Select Native Language
                        </option>

                        {languages.map((language) => (
                            <option
                                key={language.id}
                                value={language.id}
                            >
                                {language.name}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="primary-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Registering..."
                            : "Register"}
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;