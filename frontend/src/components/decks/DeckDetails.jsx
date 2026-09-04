// import React, { useEffect, useState } from "react";
// import {
//   Link,
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import deckService from "../../services/deckService";
// import api from "../../services/api";

// function DeckDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [deck, setDeck] = useState(null);

//   const [front, setFront] = useState("");
//   const [back, setBack] = useState("");
//   const [pronunciation, setPronunciation] =
//     useState("");

//   const [error, setError] = useState("");

//   const loadDeck = async () => {
//     try {
//       const response =
//         await deckService.getDeckById(id);

//       setDeck(response.data);
//     } catch (error) {
//       setError(
//         "Unable to load deck."
//       );
//     }
//   };

//   useEffect(() => {
//     loadDeck();
//   }, [id]);

//   const handleAddFlashcard = async (
//     event
//   ) => {
//     event.preventDefault();

//     if (!front.trim() || !back.trim()) {
//       setError(
//         "Front and Back are required."
//       );
//       return;
//     }

//     try {
//       await api.post(
//         `/decks/${id}/flashcards`,
//         {
//           front,
//           back,
//           pronunciation,
//         }
//       );

//       setFront("");
//       setBack("");
//       setPronunciation("");

//       setError("");

//       loadDeck();
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Unable to add flashcard."
//       );
//     }
//   };

//   const handleDeleteDeck = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this deck?"
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       await deckService.deleteDeck(id);

//       alert(
//         "StudyDeck deleted successfully."
//       );

//       navigate("/decks");
//     } catch (error) {
//       setError(
//         "Unable to delete deck."
//       );
//     }
//   };

//   if (!deck) {
//     return (
//       <div className="page-container">
//         {error || "Loading deck..."}
//       </div>
//     );
//   }

//   const flashcards =
//     deck.flashcards || [];

//   return (
//     <div className="page-container">
//       <Link
//         to="/decks"
//         className="back-link"
//       >
//         ← Back to Decks
//       </Link>

//       <div className="deck-detail-header">
//         <h1>{deck.title}</h1>

//         <p>
//           {deck.description}
//         </p>

//         <button
//           onClick={handleDeleteDeck}
//           className="danger-button"
//         >
//           Delete Deck
//         </button>
//       </div>

//       <section>
//         <h2>
//           Current Flashcards (
//           {flashcards.length})
//         </h2>

//         <div className="flashcard-list">
//           {flashcards.length === 0 ? (
//             <p>
//               No flashcards available.
//             </p>
//           ) : (
//             flashcards.map((card) => (
//               <div
//                 className="flashcard-row"
//                 key={card.id}
//               >
//                 <div>
//                   <strong>Front</strong>
//                   <p>
//                     {card.front}
//                   </p>
//                 </div>

//                 <div>
//                   <strong>Back</strong>
//                   <p>
//                     {card.back}
//                   </p>
//                 </div>

//                 <div>
//                   <strong>
//                     Pronunciation
//                   </strong>
//                   <p>
//                     {card.pronunciation ||
//                       "-"}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       <section className="form-card">
//         <h2>
//           Add New Flashcard
//         </h2>

//         <form
//           onSubmit={
//             handleAddFlashcard
//           }
//         >
//           <label>
//             Front (Source)
//           </label>

//           <input
//             type="text"
//             value={front}
//             onChange={(e) =>
//               setFront(e.target.value)
//             }
//           />

//           <label>
//             Back (Translation)
//           </label>

//           <input
//             type="text"
//             value={back}
//             onChange={(e) =>
//               setBack(e.target.value)
//             }
//           />

//           <label>
//             Pronunciation (Optional)
//           </label>

//           <input
//             type="text"
//             value={pronunciation}
//             onChange={(e) =>
//               setPronunciation(
//                 e.target.value
//               )
//             }
//           />

//           {error && (
//             <p className="error-message">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             className="primary-button"
//           >
//             Add Flashcard
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }

// export default DeckDetails;

// import React, { useCallback, useEffect, useState } from "react";
// import {
//     Link,
//     useNavigate,
//     useParams,
// } from "react-router-dom";

// import deckService from "../../services/deckService";
// import api from "../../services/api";

// function DeckDetails() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [deck, setDeck] = useState(null);

//     const [front, setFront] = useState("");
//     const [back, setBack] = useState("");
//     const [pronunciation, setPronunciation] = useState("");

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(true);

//     const loadDeck = useCallback(async () => {
//         setLoading(true);
//         setError("");

//         try {
//             const response = await deckService.getDeckById(id);

//             setDeck(response?.data || null);
//         } catch (err) {
//             setDeck(null);
//             setError("Failed to load deck details");
//         } finally {
//             setLoading(false);
//         }
//     }, [id]);

//     useEffect(() => {
//         loadDeck();
//     }, [loadDeck]);

//     const handleAddFlashcard = async (event) => {
//         event.preventDefault();

//         setError("");

//         if (!front.trim() || !back.trim()) {
//             setError("Front and Back are required.");
//             return;
//         }

//         try {
//             await api.post(`/decks/${id}/flashcards`, {
//                 front,
//                 back,
//                 pronunciation,
//             });

//             setFront("");
//             setBack("");
//             setPronunciation("");

//             await loadDeck();
//         } catch (err) {
//             setError(
//                 err.response?.data?.message ||
//                 "Unable to add flashcard."
//             );
//         }
//     };

//     const handleDeleteDeck = async () => {
//         const confirmed = window.confirm(
//             "Are you sure you want to delete this deck?"
//         );

//         if (!confirmed) {
//             return;
//         }

//         try {
//             await deckService.deleteDeck(id);

//             alert("StudyDeck deleted successfully.");

//             navigate("/decks");
//         } catch (err) {
//             setError("Unable to delete deck.");
//         }
//     };

//     if (loading) {
//         return (
//             <div className="page-container">
//                 Loading deck...
//             </div>
//         );
//     }

//     if (error && !deck) {
//         return (
//             <div className="page-container">
//                 {error}
//             </div>
//         );
//     }

//     if (!deck) {
//         return (
//             <div className="page-container">
//                 Failed to load deck details
//             </div>
//         );
//     }

//     const flashcards = deck.flashcards || [];

//     return (
//         <div className="page-container">
//             <Link
//                 to="/decks"
//                 className="back-link"
//             >
//                 ← Back to Decks
//             </Link>

//             <div className="deck-detail-header">
//                 <h1>{deck.title}</h1>

//                 <p>
//                     {deck.description}
//                 </p>

//                 <button
//                     type="button"
//                     onClick={handleDeleteDeck}
//                     className="danger-button"
//                 >
//                     Delete Deck
//                 </button>
//             </div>

//             <section>
//                 <h2>
//                     Current Flashcards ({flashcards.length})
//                 </h2>

//                 <div className="flashcard-list">
//                     {flashcards.length === 0 ? (
//                         <p>No flashcards available.</p>
//                     ) : (
//                         flashcards.map((card) => (
//                             <div
//                                 className="flashcard-row"
//                                 key={card.id}
//                             >
//                                 <div>
//                                     <strong>Front</strong>
//                                     <p>{card.front}</p>
//                                 </div>

//                                 <div>
//                                     <strong>Back</strong>
//                                     <p>{card.back}</p>
//                                 </div>

//                                 <div>
//                                     <strong>Pronunciation</strong>
//                                     <p>
//                                         {card.pronunciation || "-"}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </section>

//             <section className="form-card">
//                 <h2>Add New Flashcard</h2>

//                 <form onSubmit={handleAddFlashcard}>
//                     <label htmlFor="front">
//                         Front (Source)
//                     </label>

//                     <input
//                         id="front"
//                         type="text"
//                         value={front}
//                         onChange={(e) =>
//                             setFront(e.target.value)
//                         }
//                     />

//                     <label htmlFor="back">
//                         Back (Translation)
//                     </label>

//                     <input
//                         id="back"
//                         type="text"
//                         value={back}
//                         onChange={(e) =>
//                             setBack(e.target.value)
//                         }
//                     />

//                     <label htmlFor="pronunciation">
//                         Pronunciation (Optional)
//                     </label>

//                     <input
//                         id="pronunciation"
//                         type="text"
//                         value={pronunciation}
//                         onChange={(e) =>
//                             setPronunciation(e.target.value)
//                         }
//                     />

//                     {error && (
//                         <p className="error-message">
//                             {error}
//                         </p>
//                     )}

//                     <button
//                         type="submit"
//                         className="primary-button"
//                     >
//                         Add Flashcard
//                     </button>
//                 </form>
//             </section>
//         </div>
//     );
// }

// export default DeckDetails;

// import React, {
//   useCallback,
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import deckService from "../../services/deckService";
// import api from "../../services/api";

// function DeckDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [deck, setDeck] = useState(null);

//   const [front, setFront] = useState("");
//   const [back, setBack] = useState("");
//   const [pronunciation, setPronunciation] =
//     useState("");

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);

//   const loadDeck = useCallback(async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response =
//         await deckService.getDeckById(id);

//       setDeck(response?.data || null);
//     } catch (err) {
//       setDeck(null);
//       setError("Failed to load deck details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     loadDeck();
//   }, [loadDeck]);

//   const handleAddFlashcard = async (event) => {
//     event.preventDefault();

//     setError("");
//     setSuccess("");

//     if (!front.trim() || !back.trim()) {
//       setError(
//         "Front and Back are required."
//       );
//       return;
//     }

//     try {
//       await api.post(
//         `/decks/${id}/flashcards`,
//         {
//           front: front.trim(),
//           back: back.trim(),
//           pronunciation: pronunciation.trim(),
//         }
//       );

//       setFront("");
//       setBack("");
//       setPronunciation("");

//       setSuccess(
//         "Flashcard added successfully."
//       );

//       await loadDeck();
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//         "Unable to add flashcard."
//       );
//     }
//   };

//   const handleDeleteDeck = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this deck?"
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       await deckService.deleteDeck(id);

//       alert(
//         "StudyDeck deleted successfully."
//       );

//       navigate("/decks");
//     } catch (err) {
//       setError("Unable to delete deck.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="page-container">
//         Loading deck...
//       </div>
//     );
//   }

//   if (error && !deck) {
//     return (
//       <div className="page-container">
//         {error}
//       </div>
//     );
//   }

//   if (!deck) {
//     return (
//       <div className="page-container">
//         Failed to load deck details
//       </div>
//     );
//   }

//   const flashcards =
//     Array.isArray(deck.flashcards)
//       ? deck.flashcards
//       : [];

//   return (
//     <div className="page-container">
//       <Link
//         to="/decks"
//         className="back-link"
//       >
//         ← Back to Decks
//       </Link>

//       <div className="deck-detail-header">
//         <h1>{deck.title}</h1>

//         <p>
//           {deck.description}
//         </p>

//         <button
//           type="button"
//           onClick={handleDeleteDeck}
//           className="danger-button"
//         >
//           Delete Deck
//         </button>
//       </div>

//       {success && (
//         <div
//           className="success-message"
//           role="alert"
//         >
//           {success}
//         </div>
//       )}

//       <section>
//         <h2>
//           Current Flashcards (
//           {flashcards.length}
//           )
//         </h2>

//         <div className="flashcard-list">
//           {flashcards.length === 0 ? (
//             <p>
//               No flashcards available.
//             </p>
//           ) : (
//             flashcards.map((card) => (
//               <div
//                 className="flashcard-row"
//                 key={card.id}
//               >
//                 <div>
//                   <strong>
//                     Front
//                   </strong>
//                   <p>
//                     {card.front}
//                   </p>
//                 </div>

//                 <div>
//                   <strong>
//                     Back
//                   </strong>
//                   <p>
//                     {card.back}
//                   </p>
//                 </div>

//                 <div>
//                   <strong>
//                     Pronunciation
//                   </strong>
//                   <p>
//                     {card.pronunciation ||
//                       "-"}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       <section className="form-card">
//         <h2>
//           Add New Flashcard
//         </h2>

//         <form
//           onSubmit={handleAddFlashcard}
//         >
//           <label htmlFor="front">
//             Front (Source)
//           </label>

//           <input
//             id="front"
//             name="front"
//             type="text"
//             placeholder="e.g., Hello"
//             value={front}
//             onChange={(e) =>
//               setFront(e.target.value)
//             }
//           />

//           <label htmlFor="back">
//             Back (Translation)
//           </label>

//           <input
//             id="back"
//             name="back"
//             type="text"
//             placeholder="e.g., Hola"
//             value={back}
//             onChange={(e) =>
//               setBack(e.target.value)
//             }
//           />

//           <label htmlFor="pronunciation">
//             Pronunciation (Optional)
//           </label>

//           <input
//             id="pronunciation"
//             name="pronunciation"
//             type="text"
//             placeholder="e.g., həˈləʊ"
//             value={pronunciation}
//             onChange={(e) =>
//               setPronunciation(
//                 e.target.value
//               )
//             }
//           />

//           {error && (
//             <p
//               className="error-message"
//               role="alert"
//             >
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             className="primary-button"
//           >
//             + Add to Deck
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }

// export default DeckDetails;


import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import deckService from "../../services/deckService";
import api from "../../services/api";

function DeckDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [pronunciation, setPronunciation] =
    useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadDeck = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response =
        await deckService.getDeckById(id);

      setDeck(response?.data || null);
    } catch (err) {
      setDeck(null);
      setError("Failed to load deck details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadDeck();
  }, [loadDeck]);

  const handleAddFlashcard = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!front.trim() || !back.trim()) {
      setError(
        "Front and Back are required."
      );
      return;
    }

    try {
      await api.post(
        `/decks/${id}/flashcards`,
        {
          front: front.trim(),
          back: back.trim(),
          pronunciation: pronunciation.trim(),
        }
      );

      setFront("");
      setBack("");
      setPronunciation("");

      setSuccess(
        "Flashcard added successfully."
      );

      await loadDeck();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to add flashcard."
      );
    }
  };

  const handleDeleteDeck = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deckService.deleteDeck(id);

      alert(
        "StudyDeck deleted successfully."
      );

      navigate("/decks");
    } catch (err) {
      setError("Unable to delete deck.");
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        Loading deck...
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="page-container">
        {error || "Failed to load deck details"}
      </div>
    );
  }

  const flashcards = Array.isArray(
    deck.flashcards
  )
    ? deck.flashcards
    : [];

  return (
    <div className="page-container">

      <Link
        to="/decks"
        className="back-link"
      >
        ← Back to Decks
      </Link>

      <div className="deck-detail-header">
        <h1>{deck.title}</h1>

        <p>
          {deck.description || ""}
        </p>

        <button
          type="button"
          className="danger-button"
          onClick={handleDeleteDeck}
        >
          Delete Deck
        </button>
      </div>

      {success && (
        <div
          className="success-message"
          role="alert"
        >
          {success}
        </div>
      )}

      {error && (
        <div
          className="error-message"
          role="alert"
        >
          {error}
        </div>
      )}

      <section>
        <h2>
          Current Flashcards (
          {flashcards.length}
          )
        </h2>

        <div className="flashcard-list">

          {flashcards.length === 0 ? (
            <p>
              No flashcards available.
            </p>
          ) : (
            flashcards.map((card) => (
              <div
                className="flashcard-row"
                key={card.id}
              >
                <div>
                  <strong>Front</strong>
                  <p>
                    {card.front}
                  </p>
                </div>

                <div>
                  <strong>Back</strong>
                  <p>
                    {card.back}
                  </p>
                </div>

                <div>
                  <strong>
                    Pronunciation
                  </strong>
                  <p>
                    {card.pronunciation ||
                      "-"}
                  </p>
                </div>
              </div>
            ))
          )}

        </div>
      </section>

      <section className="form-card">

        <h2>
          Add New Flashcard
        </h2>

        <form
          onSubmit={handleAddFlashcard}
        >

          <label htmlFor="front">
            Front (Source)
          </label>

          <input
            id="front"
            name="front"
            type="text"
            placeholder="e.g., Hello"
            value={front}
            onChange={(e) =>
              setFront(e.target.value)
            }
          />

          <label htmlFor="back">
            Back (Translation)
          </label>

          <input
            id="back"
            name="back"
            type="text"
            placeholder="e.g., Hola"
            value={back}
            onChange={(e) =>
              setBack(e.target.value)
            }
          />

          <label htmlFor="pronunciation">
            Pronunciation (Optional)
          </label>

          <input
            id="pronunciation"
            name="pronunciation"
            type="text"
            placeholder="e.g., həˈləʊ"
            value={pronunciation}
            onChange={(e) =>
              setPronunciation(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="primary-button"
          >
            + Add to Deck
          </button>

        </form>

      </section>

    </div>
  );
}

export default DeckDetails;

