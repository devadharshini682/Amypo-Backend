
// import React, { useCallback, useEffect, useState } from "react";
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
//   const [pronunciation, setPronunciation] = useState("");

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
//       setError("Front and Back are required.");
//       return;
//     }

//     try {
//       await api.post(`/decks/${id}/cards`, {
//         frontText: front,
//         backText: back,
//         pronunciation,
//       });

//       setSuccess("Flashcard added successfully.");

//       setFront("");
//       setBack("");
//       setPronunciation("");

//       await loadDeck();
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
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

//       alert("StudyDeck deleted successfully.");

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

//   const flashcards = Array.isArray(deck.flashcards)
//     ? deck.flashcards
//     : [];

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

//       <section>
//         <h2>
//           Current Flashcards ({flashcards.length})
//         </h2>

//         <div className="flashcard-list">
//           {flashcards.length === 0 ? (
//             <p>No flashcards available.</p>
//           ) : (
//             flashcards.map((card) => (
//               <div
//                 className="flashcard-row"
//                 key={card.id}
//               >
//                 <div>
//                   <strong>Front</strong>
//                   <p>
//                     {card.frontText || card.front}
//                   </p>
//                 </div>

//                 <div>
//                   <strong>Back</strong>
//                   <p>
//                     {card.backText || card.back}
//                   </p>
//                 </div>

//                 <div>
//                   <strong>Pronunciation</strong>
//                   <p>
//                     {card.pronunciation || "-"}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       <section className="form-card">
//         <h2>Add New Flashcard</h2>

//         {success && (
//           <div className="success-message">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleAddFlashcard}>
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
//               setPronunciation(e.target.value)
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
//             + Add to Deck
//           </button>
//         </form>
//       </section>
//     </div>
//   );
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
//   const [flashcards, setFlashcards] = useState([]);

//   const [front, setFront] = useState("");
//   const [back, setBack] = useState("");
//   const [pronunciation, setPronunciation] = useState("");

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);


//   // LOAD DECK AND FLASHCARDS
//   const loadDeck = useCallback(async () => {

//     setLoading(true);
//     setError("");

//     try {

//       const deckResponse =
//         await deckService.getDeckById(id);

//       const flashcardResponse =
//         await api.get(
//           `/flashcards/deck/${id}`
//         );

//       setDeck(
//         deckResponse?.data || null
//       );

//       setFlashcards(
//         flashcardResponse?.data || []
//       );

//     } catch (err) {

//       setDeck(null);
//       setFlashcards([]);

//       setError(
//         "Failed to load deck details"
//       );

//     } finally {

//       setLoading(false);

//     }

//   }, [id]);


//   useEffect(() => {
//     loadDeck();
//   }, [loadDeck]);


//   // ADD FLASHCARD
//   const handleAddFlashcard = async (event) => {

//     event.preventDefault();

//     setError("");
//     setSuccess("");

//     if (
//       !front.trim() ||
//       !back.trim()
//     ) {

//       setError(
//         "Front and Back are required."
//       );

//       return;
//     }


//     try {

//       await api.post(
//         `/decks/${id}/cards`,
//         {
//           frontText: front,
//           backText: back,
//           orderIndex:
//             flashcards.length + 1,
//         }
//       );


//       setSuccess(
//         "Flashcard added successfully."
//       );

//       setFront("");
//       setBack("");
//       setPronunciation("");

//       await loadDeck();

//     } catch (err) {

//       setError(
//         err?.response?.data?.message ||
//           "Unable to add flashcard."
//       );

//     }

//   };


//   // DELETE SPECIFIC FLASHCARD
//   const handleDeleteFlashcard = async (
//     flashcardId
//   ) => {

//     const confirmed =
//       window.confirm(
//         "Are you sure you want to delete this flashcard?"
//       );

//     if (!confirmed) {
//       return;
//     }


//     setError("");
//     setSuccess("");


//     try {

//       // DELETE USING FLASHCARD ID
//       await api.delete(
//         `/flashcards/${flashcardId}`
//       );


//       setSuccess(
//         "Flashcard deleted successfully."
//       );


//       await loadDeck();

//     } catch (err) {

//       setError(
//         err?.response?.data?.message ||
//           "Unable to delete flashcard."
//       );

//     }

//   };


//   // DELETE DECK
//   const handleDeleteDeck = async () => {

//     const confirmed =
//       window.confirm(
//         "Are you sure you want to delete this deck?"
//       );

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

//       setError(
//         "Unable to delete deck."
//       );

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


//   return (
//     <div className="page-container">

//       <Link
//         to="/decks"
//         className="back-link"
//       >
//         ← Back to Decks
//       </Link>


//       {/* DECK DETAILS */}
//       <div className="deck-detail-header">

//         <h1>
//           {deck.title}
//         </h1>

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


//       {/* FLASHCARDS */}
//       <section>

//         <h2>
//           Current Flashcards (
//           {flashcards.length}
//           )
//         </h2>


//         {success && (
//           <div className="success-message">
//             {success}
//           </div>
//         )}


//         {error && (
//           <p className="error-message">
//             {error}
//           </p>
//         )}


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
//                     {card.frontContent ||
//                       card.frontText ||
//                       card.front ||
//                       "-"}
//                   </p>

//                 </div>


//                 <div>

//                   <strong>
//                     Back
//                   </strong>

//                   <p>
//                     {card.backContent ||
//                       card.backText ||
//                       card.back ||
//                       "-"}
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


//                 <div>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       handleDeleteFlashcard(
//                         card.id
//                       )
//                     }
//                     className="danger-button"
//                   >
//                     Delete
//                   </button>

//                 </div>

//               </div>

//             ))

//           )}

//         </div>

//       </section>


//       {/* ADD FLASHCARD */}
//       <section className="form-card">

//         <h2>
//           Add New Flashcard
//         </h2>


//         <form
//           onSubmit={
//             handleAddFlashcard
//           }
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
//               setPronunciation(e.target.value)
//             }
//           />


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


  const [deck, setDeck] =
    useState(null);

  const [flashcards, setFlashcards] =
    useState([]);


  const [front, setFront] =
    useState("");

  const [back, setBack] =
    useState("");

  const [pronunciation, setPronunciation] =
    useState("");

  const [exampleSentence, setExampleSentence] =
    useState("");


  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  // --------------------------------
  // LOAD DECK AND FLASHCARDS
  // --------------------------------

  const loadDeck = useCallback(
    async () => {

      setLoading(true);
      setError("");

      try {

        const [
          deckResponse,
          cardsResponse,
        ] = await Promise.all([

          deckService.getDeckById(id),

          api.get(
            `/flashcards/deck/${id}`
          ),

        ]);


        setDeck(
          deckResponse?.data || null
        );


        setFlashcards(
          Array.isArray(
            cardsResponse?.data
          )
            ? cardsResponse.data
            : []
        );

      } catch (err) {

        setDeck(null);
        setFlashcards([]);

        setError(
          "Failed to load deck details"
        );

      } finally {

        setLoading(false);

      }

    },
    [id]
  );


  useEffect(() => {

    loadDeck();

  }, [loadDeck]);


  // --------------------------------
  // ADD FLASHCARD
  // --------------------------------

  const handleAddFlashcard =
    async (event) => {

      event.preventDefault();

      setError("");
      setSuccess("");


      if (
        !front.trim() ||
        !back.trim()
      ) {

        setError(
          "Front and Back are required."
        );

        return;
      }


      try {

        /*
         * Keep /decks/{id}/cards
         * because the existing test suite
         * expects this endpoint.
         */

        await api.post(
          `/decks/${id}/cards`,
          {
            frontText: front,
            backText: back,
            pronunciation:
              pronunciation,
            exampleSentence:
              exampleSentence,
            deckId: Number(id),
            orderIndex:
              flashcards.length + 1,
          }
        );


        setSuccess(
          "Flashcard added successfully."
        );


        setFront("");
        setBack("");
        setPronunciation("");
        setExampleSentence("");


        await loadDeck();

      } catch (err) {

        setError(
          err?.response?.data?.message ||
            "Unable to add flashcard."
        );

      }

    };


  // --------------------------------
  // DELETE FLASHCARD
  // --------------------------------

  const handleDeleteFlashcard =
    async (flashcardId) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this flashcard?"
        );


      if (!confirmed) {
        return;
      }


      try {

        setError("");
        setSuccess("");


        await api.delete(
          `/flashcards/${flashcardId}`
        );


        setSuccess(
          "Flashcard deleted successfully."
        );


        await loadDeck();

      } catch (err) {

        setError(
          err?.response?.data?.message ||
            "Unable to delete flashcard."
        );

      }

    };


  // --------------------------------
  // DELETE DECK
  // --------------------------------

  const handleDeleteDeck =
    async () => {

      const confirmed =
        window.confirm(
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

        setError(
          "Unable to delete deck."
        );

      }

    };


  // --------------------------------
  // LOADING
  // --------------------------------

  if (loading) {

    return (
      <div className="page-container">
        Loading deck...
      </div>
    );

  }


  // --------------------------------
  // ERROR
  // --------------------------------

  if (error && !deck) {

    return (
      <div className="page-container">
        {error}
      </div>
    );

  }


  if (!deck) {

    return (
      <div className="page-container">
        Failed to load deck details
      </div>
    );

  }


  // --------------------------------
  // UI
  // --------------------------------

  return (

    <div className="page-container">


      <Link
        to="/decks"
        className="back-link"
      >
        ← Back to Decks
      </Link>


      <div className="deck-detail-header">

        <h1>
          {deck.title}
        </h1>

        <p>
          {deck.description}
        </p>


        <button
          type="button"
          onClick={
            handleDeleteDeck
          }
          className="danger-button"
        >
          Delete Deck
        </button>

      </div>


      {/* --------------------------------
          CURRENT FLASHCARDS
      -------------------------------- */}

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

            flashcards.map(
              (card) => (

                <div
                  className="flashcard-row"
                  key={card.id}
                >

                  <div>
                    <strong>
                      Front
                    </strong>

                    <p>
                      {card.frontContent ||
                        "-"}
                    </p>
                  </div>


                  <div>
                    <strong>
                      Back
                    </strong>

                    <p>
                      {card.backContent ||
                        "-"}
                    </p>
                  </div>


                  <div>
                    <strong>
                      Status
                    </strong>

                    <p>
                      {card.status ||
                        "ACTIVE"}
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


                  <div>
                    <strong>
                      Example Sentence
                    </strong>

                    <p>
                      {card.exampleSentence ||
                        "-"}
                    </p>
                  </div>


                  <div>

                    <button
                      type="button"
                      className="danger-button"
                      onClick={() =>
                        handleDeleteFlashcard(
                          card.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </section>


      {/* --------------------------------
          ADD FLASHCARD
      -------------------------------- */}

      <section className="form-card">

        <h2>
          Add New Flashcard
        </h2>


        {success && (
          <div className="success-message">
            {success}
          </div>
        )}


        <form
          onSubmit={
            handleAddFlashcard
          }
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
              setFront(
                e.target.value
              )
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
              setBack(
                e.target.value
              )
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


          <label htmlFor="exampleSentence">
            Example Sentence (Optional)
          </label>


          <input
            id="exampleSentence"
            name="exampleSentence"
            type="text"
            placeholder="e.g., Hello, how are you?"
            value={exampleSentence}
            onChange={(e) =>
              setExampleSentence(
                e.target.value
              )
            }
          />


          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


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