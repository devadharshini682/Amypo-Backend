import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import deckService from "../../services/deckService";

function CreateDeck() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [languageId, setLanguageId] =
    useState("");

  const [languages, setLanguages] =
    useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response =
          await api.get("/languages");

        setLanguages(response.data || []);
      } catch (error) {
        console.error(
          "Unable to load languages"
        );
      }
    };

    loadLanguages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Deck title is required.");
      return;
    }

    try {
      setLoading(true);

      const response =
        await deckService.createDeck({
          title,
          description,
          languageId:
            languageId || null,
        });

      navigate(
        `/decks/${response.data.id}`
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create deck."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h1>Create New Deck</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Deck Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter deck title"
          />

          <label>
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Enter description"
            rows="4"
          />

          <label>
            Language
          </label>

          <select
            value={languageId}
            onChange={(e) =>
              setLanguageId(e.target.value)
            }
          >
            <option value="">
              Select Language
            </option>

            {languages.map((language) => (
              <option
                key={language.id}
                value={language.id}
              >
                {language.name ||
                  language.languageName ||
                  language.title}
              </option>
            ))}
          </select>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Deck"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;