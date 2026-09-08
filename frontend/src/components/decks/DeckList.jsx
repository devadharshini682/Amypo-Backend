
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import api from "../../services/api";
// import { setDecks, setLoading } from "../../store/slices/studySlice";

// function DeckList() {
//   const dispatch = useDispatch();

//   const authUser = useSelector((state) => state.auth?.user);

//   const reduxDecks = useSelector(
//     (state) => state.decks?.items || state.study?.decks || []
//   );

//   const [localDecks, setLocalDecks] = useState(
//     Array.isArray(reduxDecks) ? reduxDecks : []
//   );

//   const [search, setSearch] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const userRole = authUser?.role;
//   const isLinguist = userRole === "LINGUIST";

//   const loadDecks = async () => {
//     try {
//       setError("");
//       dispatch(setLoading(true));

//       const response = await api.get("/decks");

//       const data = response?.data;

//       let deckData = [];

//       if (Array.isArray(data)) {
//         deckData = data;
//       } else if (Array.isArray(data?.decks)) {
//         deckData = data.decks;
//       } else if (Array.isArray(data?.items)) {
//         deckData = data.items;
//       }

//       setLocalDecks(deckData);

//       dispatch(setDecks(deckData));
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError("Failed to load decks");
//       }

//       setLocalDecks([]);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     loadDecks();

//     // The test suite verifies that loading happens on mount.
//     // loadDecks intentionally remains outside the dependency array.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       setError("");
//       setSuccess("");

//       await api.delete(`/decks/${id}`);

//       setLocalDecks((current) =>
//         current.filter((deck) => String(deck.id) !== String(id))
//       );

//       setSuccess("StudyDeck deleted successfully.");

//       // Refresh the Redux list too.
//       const remaining = localDecks.filter(
//         (deck) => String(deck.id) !== String(id)
//       );

//       dispatch(setDecks(remaining));
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError("Failed to delete deck");
//       }
//     }
//   };

//   const filteredDecks = (Array.isArray(localDecks) ? localDecks : []).filter(
//     (deck) => {
//       const title = deck?.title?.toLowerCase() || "";
//       return title.includes(search.toLowerCase());
//     }
//   );

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <div>
//           <h1>Study Decks</h1>
//           <p>Manage your vocabulary decks.</p>
//         </div>

//         {isLinguist && (
//           <Link className="primary-button" to="/decks/create">
//             + Create New Deck
//           </Link>
//         )}
//       </div>

//       <div className="search-section">
//         <input
//           type="text"
//           placeholder="Search decks"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {success && <div className="success-message">{success}</div>}

//       {error && <div className="error-message">{error}</div>}

//       {filteredDecks.length === 0 ? (
//         <div className="empty-state">
//           No decks found.

//           {isLinguist && (
//             <div>
//               <Link
//                 className="primary-button"
//                 to="/decks/create"
//               >
//                 Create Your First Deck
//               </Link>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="deck-list">
//           {filteredDecks.map((deck) => (
//             <div className="deck-card" key={deck.id}>
//               <h3>{deck.title}</h3>

//               {deck.description && (
//                 <p>{deck.description}</p>
//               )}

//               <div className="deck-actions">
//                 <Link
//                   className="secondary-button"
//                   to={`/decks/${deck.id}`}
//                 >
//                   View
//                 </Link>

//                 {isLinguist && (
//                   <>
//                     <Link
//                       className="secondary-button"
//                       to={`/decks/${deck.id}/edit`}
//                     >
//                       Edit
//                     </Link>

//                     <button
//                       type="button"
//                       className="danger-button"
//                       onClick={() => handleDelete(deck.id)}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DeckList;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import api from "../../services/api";
// import { setDecks, setLoading } from "../../store/slices/studySlice";

// function DeckList() {
//   const dispatch = useDispatch();

//   const authUser = useSelector((state) => state.auth?.user);

//   const reduxDecks = useSelector(
//     (state) => state.decks?.items || state.study?.decks || []
//   );

//   const [localDecks, setLocalDecks] = useState(
//     Array.isArray(reduxDecks) ? reduxDecks : []
//   );

//   const [search, setSearch] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const userRole = authUser?.role;
//   const isLinguist = userRole === "LINGUIST";

//   const loadDecks = async () => {
//     try {
//       setError("");
//       dispatch(setLoading(true));

//       const response = await api.get("/decks");

//       const data = response?.data;

//       let deckData = [];

//       if (Array.isArray(data)) {
//         deckData = data;
//       } else if (Array.isArray(data?.decks)) {
//         deckData = data.decks;
//       } else if (Array.isArray(data?.items)) {
//         deckData = data.items;
//       }

//       setLocalDecks(deckData);

//       dispatch(setDecks(deckData));
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError("Failed to load decks");
//       }

//       setLocalDecks([]);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     loadDecks();

//     // The test suite verifies that loading happens on mount.
//     // loadDecks intentionally remains outside the dependency array.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       setError("");
//       setSuccess("");

//       await api.delete(`/decks/${id}`);

//       setLocalDecks((current) =>
//         current.filter(
//           (deck) => String(deck.id) !== String(id)
//         )
//       );

//       setSuccess("StudyDeck deleted successfully.");

//       const remaining = localDecks.filter(
//         (deck) => String(deck.id) !== String(id)
//       );

//       dispatch(setDecks(remaining));
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError("Failed to delete deck");
//       }
//     }
//   };

//   const filteredDecks = (
//     Array.isArray(localDecks) ? localDecks : []
//   ).filter((deck) => {
//     const title = deck?.title?.toLowerCase() || "";

//     return title.includes(search.toLowerCase());
//   });

//   return (
//     <div className="page-container">

//       <div className="page-header">

//         <div>
//           <h1>Study Decks</h1>

//           <p>
//             Manage your vocabulary decks.
//           </p>
//         </div>

//         {isLinguist && (
//           <Link
//             className="primary-button"
//             to="/decks/create"
//           >
//             + Create New Deck
//           </Link>
//         )}

//       </div>

//       <div className="search-section">

//         <input
//           type="text"
//           placeholder="Search decks"
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//         />

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

//       {filteredDecks.length === 0 ? (

//         <div className="empty-state">

//           No decks found.

//           {isLinguist && (
//             <div>

//               <Link
//                 className="primary-button"
//                 to="/decks/create"
//               >
//                 Create Your First Deck
//               </Link>

//             </div>
//           )}

//         </div>

//       ) : (

//         <div className="deck-list">

//           {filteredDecks.map((deck) => (

//             <div
//               className="deck-card"
//               key={deck.id}
//             >

//               <h3>
//                 {deck.title}
//               </h3>

//               {deck.description && (
//                 <p>
//                   {deck.description}
//                 </p>
//               )}

//               <div className="deck-actions">

//                 {/* VIEW */}
//                 <Link
//                   className="secondary-button"
//                   to={`/decks/${deck.id}`}
//                 >
//                   View
//                 </Link>


//                 {/* STUDY SELECTED DECK */}
//                 <Link
//                   className="primary-button"
//                   to={`/study?deckId=${deck.id}`}
//                 >
//                   Study
//                 </Link>


//                 {/* LINGUIST ACTIONS */}
//                 {isLinguist && (
//                   <>
//                     <Link
//                       className="secondary-button"
//                       to={`/decks/${deck.id}/edit`}
//                     >
//                       Edit
//                     </Link>

//                     <button
//                       type="button"
//                       className="danger-button"
//                       onClick={() =>
//                         handleDelete(deck.id)
//                       }
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}

//               </div>

//             </div>

//           ))}

//         </div>

//       )}

//     </div>
//   );
// }

// export default DeckList;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { setDecks, setLoading } from "../../store/slices/studySlice";
import deckService from "../../services/deckService";

function DeckList() {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth?.user);

  const reduxDecks = useSelector(
    (state) => state.decks?.items || state.study?.decks || []
  );

  const [localDecks, setLocalDecks] = useState(
    Array.isArray(reduxDecks) ? reduxDecks : []
  );

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cloningId, setCloningId] = useState(null);

  const userRole = authUser?.role;
  const isLinguist = userRole === "LINGUIST";

  const loadDecks = async () => {
    try {
      setError("");
      dispatch(setLoading(true));

      const response = await api.get("/decks");

      const data = response?.data;

      let deckData = [];

      if (Array.isArray(data)) {
        deckData = data;
      } else if (Array.isArray(data?.decks)) {
        deckData = data.decks;
      } else if (Array.isArray(data?.items)) {
        deckData = data.items;
      }

      setLocalDecks(deckData);
      dispatch(setDecks(deckData));
    } catch (err) {
      if (err?.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Failed to load decks");
      }

      setLocalDecks([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadDecks();

    // The test suite verifies that loading happens on mount.
    // loadDecks intentionally remains outside the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      setError("");
      setSuccess("");

      await api.delete(`/decks/${id}`);

      setLocalDecks((current) =>
        current.filter(
          (deck) => String(deck.id) !== String(id)
        )
      );

      setSuccess("StudyDeck deleted successfully.");

      const remaining = localDecks.filter(
        (deck) => String(deck.id) !== String(id)
      );

      dispatch(setDecks(remaining));
    } catch (err) {
      if (err?.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Failed to delete deck");
      }
    }
  };

  const handleClone = async (id) => {
    try {
      setError("");
      setSuccess("");
      setCloningId(id);

      await deckService.cloneDeck(id);

      setSuccess("Deck cloned successfully.");

      await loadDecks();
    } catch (err) {
      if (err?.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError(
          err?.response?.data?.message ||
            "Failed to clone deck"
        );
      }
    } finally {
      setCloningId(null);
    }
  };

  const filteredDecks = (
    Array.isArray(localDecks)
      ? localDecks
      : []
  ).filter((deck) => {
    const title =
      deck?.title?.toLowerCase() || "";

    return title.includes(
      search.toLowerCase()
    );
  });

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>Flashcard Decks</h1>

          <p>
            Browse decks and master your personal decks.
          </p>
        </div>

        {isLinguist && (
          <Link
            className="primary-button"
            to="/decks/create"
          >
            + Create New Deck
          </Link>
        )}

      </div>


      <div className="search-section">

        <input
          type="text"
          placeholder="Search decks"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      {filteredDecks.length === 0 ? (

        <div className="empty-state">

          No decks found.

          {isLinguist && (
            <div>

              <Link
                className="primary-button"
                to="/decks/create"
              >
                Create Your First Deck
              </Link>

            </div>
          )}

        </div>

      ) : (

        <div className="deck-list">

          {filteredDecks.map((deck) => (

            <div
              className="deck-card"
              key={deck.id}
            >

              <h3>
                {deck.title}
              </h3>


              {deck.description && (
                <p>
                  {deck.description}
                </p>
              )}


              <div className="deck-actions">

                {/* VIEW */}
                <Link
                  className="secondary-button"
                  to={`/decks/${deck.id}`}
                >
                  View
                </Link>


                {/* STUDY THIS DECK */}
                <Link
                  className="primary-button"
                  to={`/study?deckId=${deck.id}`}
                >
                  Study Now
                </Link>


                {/* MANAGE CARDS */}
                <Link
                  className="secondary-button"
                  to={`/decks/${deck.id}`}
                >
                  Manage Cards
                </Link>


                {/* CLONE */}
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    handleClone(deck.id)
                  }
                  disabled={
                    cloningId === deck.id
                  }
                >
                  {cloningId === deck.id
                    ? "Cloning..."
                    : "Clone to My Deck"}
                </button>


                {/* LINGUIST ACTIONS */}
                {isLinguist && (
                  <>

                    <Link
                      className="secondary-button"
                      to={`/decks/${deck.id}/edit`}
                    >
                      Edit
                    </Link>


                    <button
                      type="button"
                      className="danger-button"
                      onClick={() =>
                        handleDelete(deck.id)
                      }
                    >
                      Delete
                    </button>

                  </>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default DeckList;