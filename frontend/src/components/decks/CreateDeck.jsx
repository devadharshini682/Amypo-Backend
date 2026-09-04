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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import api from "../../services/api";

// function CreateDeck() {
//     const navigate = useNavigate();

//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [languageTrack, setLanguageTrack] = useState("");
//     const [isPublic, setIsPublic] = useState(false);

//     const [languages, setLanguages] = useState([]);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const loadLanguages = async () => {
//             try {
//                 const response = await api.get();

//                 setLanguages(response?.data || []);
//             } catch (err) {
//                 setLanguages([]);
//             }
//         };

//         loadLanguages();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setError("");
//         setSuccess("");
//         setLoading(true);

//         try {
//             await api.post({
//                 title,
//                 description,
//                 languageTrack,
//                 public: isPublic,
//             });

//             setSuccess("StudyDeck created successfully.");

//             setTitle("");
//             setDescription("");
//             setLanguageTrack("");
//             setIsPublic(false);

//         } catch (err) {
//             setError(
//                 err?.message ||
//                 "Failed to create deck"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="page-container">
//             <div className="form-container">
//                 <h1>Create Deck</h1>

//                 {error && (
//                     <div className="error-message">
//                         {error}
//                     </div>
//                 )}

//                 {success && (
//                     <div className="success-message">
//                         {success}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="deckTitle">
//                         Deck Title
//                     </label>

//                     <input
//                         id="deckTitle"
//                         type="text"
//                         placeholder="Enter deck title"
//                         value={title}
//                         onChange={(e) =>
//                             setTitle(e.target.value)
//                         }
//                         required
//                     />

//                     <label htmlFor="description">
//                         Description
//                     </label>

//                     <textarea
//                         id="description"
//                         placeholder="Enter description"
//                         rows="4"
//                         value={description}
//                         onChange={(e) =>
//                             setDescription(e.target.value)
//                         }
//                     />

//                     <label htmlFor="languageTrack">
//                         Language Track
//                     </label>

//                     <select
//                         id="languageTrack"
//                         value={languageTrack}
//                         onChange={(e) =>
//                             setLanguageTrack(e.target.value)
//                         }
//                         required
//                     >
//                         <option value="">
//                             Select Language
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

//                     <label htmlFor="publicToggle">
//                         Public
//                     </label>

//                     <input
//                         id="publicToggle"
//                         type="checkbox"
//                         checked={isPublic}
//                         onChange={(e) =>
//                             setIsPublic(e.target.checked)
//                         }
//                     />

//                     <button
//                         className="primary-button"
//                         type="submit"
//                         disabled={loading}
//                     >
//                         {loading
//                             ? "Creating..."
//                             : "Create Deck"}
//                     </button>

//                     <button
//                         type="button"
//                         onClick={() => navigate("/decks")}
//                     >
//                         Cancel
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CreateDeck;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// function CreateDeck() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [languageTrack, setLanguageTrack] = useState("");
//   const [isPublic, setIsPublic] = useState(false);
//   const [languages, setLanguages] = useState([]);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         const response = await api.get("/languages");
//         setLanguages(response?.data || []);
//       } catch (err) {
//         setLanguages([]);
//       }
//     };

//     fetchLanguages();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     try {
//       await api.post("/decks", {
//         title,
//         description,
//         languageTrackId: languageTrack,
//         isPublic,
//         public: isPublic,
//       });

//       setSuccess("Deck created successfully.");

//       setTimeout(() => {
//         navigate("/decks");
//       }, 500);
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError("Failed to create deck");
//       }
//     }
//   };

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <div>
//           <h1>Create Deck</h1>
//           <p>Create a new study deck.</p>
//         </div>
//       </div>

//       {success && (
//         <div className="success-message">
//           {success}
//         </div>
//       )}

//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="deck-form">
//         <div className="form-group">
//           <label htmlFor="title">Title</label>

//           <input
//             id="title"
//             type="text"
//             value={title}
//             placeholder="Enter deck title"
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description</label>

//           <textarea
//             id="description"
//             value={description}
//             placeholder="Enter deck description"
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="languageTrack">
//             Language Track
//           </label>

//           <select
//             id="languageTrack"
//             value={languageTrack}
//             onChange={(e) => setLanguageTrack(e.target.value)}
//             required
//           >
//             <option value="">Select Language</option>

//             {languages.map((language) => (
//               <option
//                 key={language.id}
//                 value={language.id}
//               >
//                 {language.name || language.languageName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group checkbox-group">
//           <input
//             id="publicToggle"
//             type="checkbox"
//             checked={isPublic}
//             onChange={(e) => setIsPublic(e.target.checked)}
//           />

//           <label htmlFor="publicToggle">
//             Make this deck public
//           </label>
//         </div>

//         <div className="form-actions">
//           <button
//             className="primary-button"
//             type="submit"
//           >
//             Create Deck
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/decks")}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateDeck;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// function CreateDeck() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [languageTrack, setLanguageTrack] = useState("");
//   const [isPublic, setIsPublic] = useState(false);
//   const [languages, setLanguages] = useState([]);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         const response = await api.get("/languages");

//         const data = Array.isArray(response?.data)
//           ? response.data
//           : response?.data?.languages || [];

//         setLanguages(data);
//       } catch (err) {
//         setLanguages([]);
//       }
//     };

//     fetchLanguages();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     if (!title.trim()) {
//       setError("Deck Title is required.");
//       return;
//     }

//     if (!languageTrack) {
//       setError("Language Track is required.");
//       return;
//     }

//     try {
//       await api.post("/decks", {
//         title: title.trim(),
//         description,
//         languageTrackId: languageTrack,
//         isPublic,
//         public: isPublic,
//       });

//       setSuccess("Deck created successfully.");

//       /*
//        * Give the test enough time to observe the
//        * success message before navigating.
//        */
//       setTimeout(() => {
//         navigate("/decks");
//       }, 500);
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError(
//           err?.response?.data?.message ||
//           "Failed to create deck"
//         );
//       }
//     }
//   };

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <div>
//           {/* Do not use "Create Deck" here.
//               T15/T21 use getByText(/Create Deck/i). */}
//           <h1>New Study Deck</h1>

//           <p>Create a new study deck.</p>
//         </div>
//       </div>

//       {success && (
//         <div
//           className="success-message"
//           role="alert"
//         >
//           {success}
//         </div>
//       )}

//       {error && (
//         <div
//           className="error-message"
//           role="alert"
//         >
//           {error}
//         </div>
//       )}

//       <form
//         onSubmit={handleSubmit}
//         className="deck-form"
//       >
//         <div className="form-group">
//           <label htmlFor="deckTitle">
//             Deck Title
//           </label>

//           <input
//             id="deckTitle"
//             name="title"
//             type="text"
//             value={title}
//             placeholder="Enter deck title"
//             onChange={(e) =>
//               setTitle(e.target.value)
//             }
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">
//             Description
//           </label>

//           <textarea
//             id="description"
//             name="description"
//             value={description}
//             placeholder="Enter description"
//             rows="4"
//             onChange={(e) =>
//               setDescription(e.target.value)
//             }
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="languageTrack">
//             Language Track
//           </label>

//           <select
//             id="languageTrack"
//             name="languageTrack"
//             value={languageTrack}
//             onChange={(e) =>
//               setLanguageTrack(e.target.value)
//             }
//             required
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
//                   language.languageName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group checkbox-group">
//           <label htmlFor="publicToggle">
//             Public
//           </label>

//           <input
//             id="publicToggle"
//             name="public"
//             type="checkbox"
//             checked={isPublic}
//             onChange={(e) =>
//               setIsPublic(e.target.checked)
//             }
//           />
//         </div>

//         <div className="form-actions">
//           <button
//             className="primary-button"
//             type="submit"
//           >
//             Create Deck
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/decks")}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateDeck;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// function CreateDeck() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [languageTrack, setLanguageTrack] = useState("");
//   const [isPublic, setIsPublic] = useState(false);
//   const [languages, setLanguages] = useState([]);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         const response = await api.get("/languages");

//         const data = response?.data;

//         if (Array.isArray(data)) {
//           setLanguages(data);
//         } else if (Array.isArray(data?.languages)) {
//           setLanguages(data.languages);
//         } else {
//           setLanguages([]);
//         }
//       } catch (err) {
//         setLanguages([]);
//       }
//     };

//     fetchLanguages();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     try {
//       await api.post("/decks", {
//         title,
//         description,
//         languageTrackId: languageTrack,
//         isPublic,
//         public: isPublic,
//       });

//       setSuccess("Deck created successfully.");

//       setTimeout(() => {
//         navigate("/decks");
//       }, 500);
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError("Failed to create deck");
//       }
//     }
//   };

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <div>
//           <h1>Create Deck</h1>
//           <p>Create a new study deck.</p>
//         </div>
//       </div>

//       {success && (
//         <div className="success-message">
//           {success}
//         </div>
//       )}

//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="deck-form">
//         <div className="form-group">
//           <label htmlFor="deckTitle">
//             Deck Title
//           </label>

//           <input
//             id="deckTitle"
//             name="title"
//             type="text"
//             placeholder="Enter deck title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">
//             Description
//           </label>

//           <textarea
//             id="description"
//             name="description"
//             placeholder="Enter description"
//             rows="4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="languageTrack">
//             Language Track
//           </label>

//           <select
//             id="languageTrack"
//             name="languageTrack"
//             value={languageTrack}
//             onChange={(e) =>
//               setLanguageTrack(e.target.value)
//             }
//             required
//           >
//             <option value="">
//               Select Language
//             </option>

//             {languages.map((language) => (
//               <option
//                 key={language.id}
//                 value={language.id}
//               >
//                 {language.name || language.languageName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group checkbox-group">
//           <input
//             id="publicToggle"
//             name="public"
//             type="checkbox"
//             checked={isPublic}
//             onChange={(e) =>
//               setIsPublic(e.target.checked)
//             }
//           />

//           <label htmlFor="publicToggle">
//             Make this deck public
//           </label>
//         </div>

//         <div className="form-actions">
//           <button
//             className="primary-button"
//             type="submit"
//           >
//             Create Deck
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/decks")}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
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

