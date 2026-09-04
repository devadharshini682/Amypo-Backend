// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import deckService from "../../services/deckService";
// import {
//   setDecks,
//   setLoading,
//   setError,
// } from "../../store/slices/deckSlice";

// function DeckList() {
//   const dispatch = useDispatch();

//   const { decks, loading } = useSelector(
//     (state) => state.decks
//   );

//   const { user } = useSelector(
//     (state) => state.auth
//   );

//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchDecks = async () => {
//       try {
//         dispatch(setLoading(true));

//         const response =
//           await deckService.getDecks();

//         dispatch(
//           setDecks(response.data || [])
//         );
//       } catch (error) {
//         dispatch(
//           setError(
//             "Unable to fetch decks."
//           )
//         );
//       }
//     };

//     fetchDecks();
//   }, [dispatch]);

//   const filteredDecks = decks.filter(
//     (deck) => {
//       const title =
//         deck.title?.toLowerCase() || "";

//       const description =
//         deck.description?.toLowerCase() || "";

//       const keyword =
//         search.toLowerCase();

//       return (
//         title.includes(keyword) ||
//         description.includes(keyword)
//       );
//     }
//   );

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <div>
//           <h1>Flashcard Decks</h1>

//           <p>
//             Browse collections or master
//             your personal decks.
//           </p>
//         </div>

//         {user?.role === "LINGUIST" && (
//           <Link
//             to="/decks/create"
//             className="primary-button"
//           >
//             + Create New Deck
//           </Link>
//         )}
//       </div>

//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Search for decks..."
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//         />
//       </div>

//       {loading ? (
//         <p>Loading decks...</p>
//       ) : filteredDecks.length === 0 ? (
//         <div className="empty-state">
//           <h2>No Decks Found</h2>
//         </div>
//       ) : (
//         <div className="deck-grid">
//           {filteredDecks.map((deck) => (
//             <div
//               className="deck-card"
//               key={deck.id}
//             >
//               <h2>{deck.title}</h2>

//               <p>
//                 {deck.description ||
//                   "No description available."}
//               </p>

//               <p className="deck-count">
//                 {deck.flashcards?.length ||
//                   deck.flashcardCount ||
//                   0}{" "}
//                 cards
//               </p>

//               <Link
//                 to={`/decks/${deck.id}`}
//                 className="secondary-button"
//               >
//                 View Deck
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DeckList;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import { setDecks } from "../../store/slices/studySlice";

function DeckList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [decks, setLocalDecks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadDecks = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get();

            const data = response?.data || [];

            const deckData = Array.isArray(data)
                ? data
                : data.decks || [];

            setLocalDecks(deckData);
            dispatch(setDecks(deckData));
        } catch (err) {
            setError("Failed to load decks");
            setLocalDecks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDecks();
    }, []);

    const filteredDecks = (decks || []).filter((deck) => {
        const title = deck?.title?.toLowerCase() || "";

        return title.includes(searchTerm.toLowerCase());
    });

    const handleDelete = async (id) => {
        try {
            await api.delete(id);

            setLocalDecks((previous) =>
                previous.filter((deck) => deck.id !== id)
            );

            setSuccess("StudyDeck deleted successfully.");
        } catch (err) {
            setError("Failed to delete deck");
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Study Decks</h1>
                    <p>Manage your vocabulary decks.</p>
                </div>

                <Link
                    to="/decks/create"
                    className="primary-button"
                >
                    Create Deck
                </Link>
            </div>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search decks"
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />
            </div>

            {loading && (
                <p>Loading decks...</p>
            )}

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

            {!loading && filteredDecks.length === 0 && (
                <div className="empty-state">
                    No decks found.
                </div>
            )}

            <div className="deck-list">
                {filteredDecks.map((deck) => (
                    <div
                        className="deck-card"
                        key={deck.id}
                    >
                        <h3>{deck.title}</h3>

                        {deck.description && (
                            <p>{deck.description}</p>
                        )}

                        <div className="deck-actions">
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/decks/edit/${deck.id}`
                                    )
                                }
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    handleDelete(deck.id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeckList;

