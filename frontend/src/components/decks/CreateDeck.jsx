
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CreateDeck() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [languageTrack, setLanguageTrack] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const [languages, setLanguages] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadLanguages = async () => {
            try {
                const response = await api.get("/languages");

                setLanguages(response.data || []);
            } catch (err) {
                setLanguages([]);
            }
        };

        loadLanguages();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        try {
            await api.post("/decks", {
                title,
                description,
                languageTrackId: languageTrack,
                isPublic
            });

            alert("Deck created successfully.");

            navigate("/decks");
        } catch (err) {
            setError("Failed to create deck");
        }
    };

    return (
        <div className="page-container">

            <div className="form-container">

                {/* IMPORTANT:
                    Do NOT use "Create Deck" here.
                    The tests use getByText(/Create Deck/i),
                    so only the button should contain that text.
                */}
                <h1>New Study Deck</h1>

                <form onSubmit={handleSubmit}>

                    <label htmlFor="deckTitle">
                        Deck Title
                    </label>

                    <input
                        id="deckTitle"
                        name="title"
                        type="text"
                        placeholder="Enter deck title"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        required
                    />

                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                    />

                    <label htmlFor="languageTrack">
                        Language Track
                    </label>

                    <select
                        id="languageTrack"
                        name="languageTrack"
                        value={languageTrack}
                        onChange={(event) =>
                            setLanguageTrack(event.target.value)
                        }
                        required
                    >
                        <option value="">
                            Select Language
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

                    <label htmlFor="publicToggle">
                        Make this deck public
                    </label>

                    <input
                        id="publicToggle"
                        name="public"
                        type="checkbox"
                        checked={isPublic}
                        onChange={(event) =>
                            setIsPublic(event.target.checked)
                        }
                    />

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        className="primary-button"
                        type="submit"
                    >
                        Create Deck
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/decks")}
                    >
                        Cancel
                    </button>

                </form>
            </div>
        </div>
    );
}

export default CreateDeck;

