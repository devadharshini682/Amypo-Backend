
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