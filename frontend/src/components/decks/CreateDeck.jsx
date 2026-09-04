// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import api from "../../services/api";
// import deckService from "../../services/deckService";

// function CreateDeck() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] =
//     useState("");
//   const [languageId, setLanguageId] =
//     useState("");

//   const [languages, setLanguages] =
//     useState([]);

//   const [error, setError] = useState("");
//   const [loading, setLoading] =
//     useState(false);

//   useEffect(() => {
//     const loadLanguages = async () => {
//       try {
//         const response =
//           await api.get("/languages");

//         setLanguages(response.data || []);
//       } catch (error) {
//         console.error(
//           "Unable to load languages"
//         );
//       }
//     };

//     loadLanguages();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");

//     if (!title.trim()) {
//       setError("Deck title is required.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response =
//         await deckService.createDeck({
//           title,
//           description,
//           languageId:
//             languageId || null,
//         });

//       navigate(
//         `/decks/${response.data.id}`
//       );
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Unable to create deck."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-container">
//       <div className="form-card">
//         <h1>Create New Deck</h1>

//         <form onSubmit={handleSubmit}>
//           <label>
//             Deck Title
//           </label>

//           <input
//             type="text"
//             value={title}
//             onChange={(e) =>
//               setTitle(e.target.value)
//             }
//             placeholder="Enter deck title"
//           />

//           <label>
//             Description
//           </label>

//           <textarea
//             value={description}
//             onChange={(e) =>
//               setDescription(e.target.value)
//             }
//             placeholder="Enter description"
//             rows="4"
//           />

//           <label>
//             Language
//           </label>

//           <select
//             value={languageId}
//             onChange={(e) =>
//               setLanguageId(e.target.value)
//             }
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

//           <button
//             type="submit"
//             className="primary-button"
//             disabled={loading}
//           >
//             {loading
//               ? "Creating..."
//               : "Create Deck"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateDeck;

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
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadLanguages = async () => {
            try {
                const response = await api.get();

                setLanguages(response?.data || []);
            } catch (err) {
                setLanguages([]);
            }
        };

        loadLanguages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await api.post({
                title,
                description,
                languageTrack,
                public: isPublic,
            });

            setSuccess("StudyDeck created successfully.");

            setTitle("");
            setDescription("");
            setLanguageTrack("");
            setIsPublic(false);

        } catch (err) {
            setError(
                err?.message ||
                "Failed to create deck"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1>Create Deck</h1>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="deckTitle">
                        Deck Title
                    </label>

                    <input
                        id="deckTitle"
                        type="text"
                        placeholder="Enter deck title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        placeholder="Enter description"
                        rows="4"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <label htmlFor="languageTrack">
                        Language Track
                    </label>

                    <select
                        id="languageTrack"
                        value={languageTrack}
                        onChange={(e) =>
                            setLanguageTrack(e.target.value)
                        }
                        required
                    >
                        <option value="">
                            Select Language
                        </option>

                        {languages.map((language) => (
                            <option
                                key={language.id}
                                value={
                                    language.id ||
                                    language.name
                                }
                            >
                                {language.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="publicToggle">
                        Public
                    </label>

                    <input
                        id="publicToggle"
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) =>
                            setIsPublic(e.target.checked)
                        }
                    />

                    <button
                        className="primary-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Deck"}
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

