
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../services/api";

function Dashboard() {
  const user = useSelector((state) => state.auth?.user);

  const [stats, setStats] = useState({
    totalDecks: 0,
    totalFlashcards: 0,
    masteredCards: 0,
    dueCards: 0,
    streak: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        // Get logged-in user ID
        const userId = user?.id;

        if (!userId) {
          console.log("User ID not available:", user);
          setLoading(false);
          return;
        }

        console.log("Dashboard user:", user);
        console.log("Dashboard user ID:", userId);

        // Get progress from backend
        const response = await api.get(
          `/analytics/progress?userId=${userId}`
        );

        console.log("Dashboard API response:", response.data);

        const data = response?.data || {};

        setStats({
          totalDecks:
            data.totalDecks ??
            data.deckCount ??
            data.totalDeckCount ??
            0,

          totalFlashcards:
            data.totalFlashcards ??
            data.flashcardCount ??
            data.totalCardCount ??
            0,

          masteredCards:
            data.masteredCards ??
            data.masteredCount ??
            0,

          dueCards:
            data.dueCards ??
            data.dueCount ??
            0,

          streak:
            data.streak ??
            data.currentStreak ??
            0,
        });
      } catch (err) {
        console.error("Dashboard error:", err);

        if (err?.response?.status === 401) {
          setError("Unauthorized. Please login again.");
        } else {
          setError("Unable to load dashboard data.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  const username = user?.username || "User";

  if (loading) {
    return (
      <div className="page-container">
        <h1>Loading dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Hello, {username}!</h1>
          <p>Welcome back to your language journey.</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Study Section */}
      <div className="study-card">
        <h2>Ready to study?</h2>

        <p>
          You have{" "}
          <strong>{stats.dueCards}</strong>{" "}
          cards waiting for review.
        </p>

        <Link
          to="/study"
          className="primary-button"
        >
          Start Session
        </Link>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Decks</h3>
          <p>{stats.totalDecks}</p>
        </div>

        <div className="stat-card">
          <h3>Total Flashcards</h3>
          <p>{stats.totalFlashcards}</p>
        </div>

        <div className="stat-card">
          <h3>Mastered Cards</h3>
          <p>{stats.masteredCards}</p>
        </div>

        <div className="stat-card">
          <h3>Due Cards</h3>
          <p>{stats.dueCards}</p>
        </div>

        <div className="stat-card">
          <h3>Streak</h3>
          <p>{stats.streak}</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;