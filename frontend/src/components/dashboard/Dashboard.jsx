
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../../services/api";

// function Dashboard() {
//     const { user } = useSelector((state) => state.auth);

//     const [stats, setStats] = useState({
//         totalDecks: 0,
//         totalFlashcards: 0,
//         masteredCards: 0,
//         dueCount: 0,
//         streak: 0,
//     });

//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadStats = async () => {
//             try {
//                 const response = await api.get();

//                 setStats(
//                     response?.data || {
//                         totalDecks: 0,
//                         totalFlashcards: 0,
//                         masteredCards: 0,
//                         dueCount: 0,
//                         streak: 0,
//                     }
//                 );
//             } catch (error) {
//                 setStats({
//                     totalDecks: 0,
//                     totalFlashcards: 0,
//                     masteredCards: 0,
//                     dueCount: 0,
//                     streak: 0,
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadStats();
//     }, []);

//     return (
//         <div className="page-container">
//             <section className="welcome-section">
//                 <h1>
//                     Hello, {user?.username || "User"}!
//                 </h1>

//                 <p>
//                     Welcome back to your language journey.
//                 </p>
//             </section>

//             <section className="study-ready">
//                 <h2>Ready to study?</h2>

//                 <p>
//                     You have {stats.dueCount} cards waiting for review.
//                 </p>

//                 <Link
//                     className="primary-button"
//                     to="/study"
//                 >
//                     Start Session
//                 </Link>
//             </section>

//             <div className="stats-grid">
//                 <div className="stat-card">
//                     <h3>Total Decks</h3>
//                     <p>{stats.totalDecks}</p>
//                 </div>

//                 <div className="stat-card">
//                     <h3>Total Flashcards</h3>
//                     <p>{stats.totalFlashcards}</p>
//                 </div>

//                 <div className="stat-card">
//                     <h3>Mastered Cards</h3>
//                     <p>{stats.masteredCards}</p>
//                 </div>

//                 <div className="stat-card">
//                     <h3>Due Cards</h3>
//                     <p>{stats.dueCount}</p>
//                 </div>

//                 <div className="stat-card">
//                     <h3>Streak</h3>
//                     <p>{stats.streak}</p>
//                 </div>
//             </div>

//             {loading && (
//                 <p className="loading-message">
//                     Loading dashboard...
//                 </p>
//             )}
//         </div>
//     );
// }

// export default Dashboard;
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../../services/api";

// function Dashboard() {
//   const { user } = useSelector((state) => state.auth);

//   const [stats, setStats] = useState({
//     totalDecks: 0,
//     totalFlashcards: 0,
//     masteredCards: 0,
//     dueCount: 0,
//     streak: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadStats = async () => {
//       try {
//         const userId = user?.id || user?.userId;

//         if (!userId) {
//           setLoading(false);
//           return;
//         }

//         const response = await api.get(
//           `/analytics/progress?userId=${userId}`
//         );

//         const data = response?.data || {};

//         setStats({
//           totalDecks: data.totalDecks ?? 0,
//           totalFlashcards: data.totalFlashcards ?? 0,
//           masteredCards: data.masteredCards ?? 0,
//           dueCount: data.dueCount ?? data.dueCards ?? 0,
//           streak: data.streak ?? 0,
//         });
//       } catch (error) {
//         console.error("Failed to load dashboard stats:", error);

//         setStats({
//           totalDecks: 0,
//           totalFlashcards: 0,
//           masteredCards: 0,
//           dueCount: 0,
//           streak: 0,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadStats();
//   }, [user]);

//   return (
//     <div className="page-container">
//       <section className="welcome-section">
//         <h1>
//           Hello, {user?.username || "User"}!
//         </h1>

//         <p>
//           Welcome back to your language journey.
//         </p>
//       </section>

//       <section className="study-ready">
//         <h2>Ready to study?</h2>

//         <p>
//           You have {stats.dueCount} cards waiting for review.
//         </p>

//         <Link
//           className="primary-button"
//           to="/study"
//         >
//           Start Session
//         </Link>
//       </section>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <h3>Total Decks</h3>
//           <p>{stats.totalDecks}</p>
//         </div>

//         <div className="stat-card">
//           <h3>Total Flashcards</h3>
//           <p>{stats.totalFlashcards}</p>
//         </div>

//         <div className="stat-card">
//           <h3>Mastered Cards</h3>
//           <p>{stats.masteredCards}</p>
//         </div>

//         <div className="stat-card">
//           <h3>Due Cards</h3>
//           <p>{stats.dueCount}</p>
//         </div>

//         <div className="stat-card">
//           <h3>Streak</h3>
//           <p>{stats.streak}</p>
//         </div>
//       </div>

//       {loading && (
//         <p className="loading-message">
//           Loading dashboard...
//         </p>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalDecks: 0,
    totalFlashcards: 0,
    masteredCards: 0,
    dueCards: 0,
    streak: 0,
    progressPercentage: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        // Get all decks
        const decksResponse = await api.get("/decks");

        // Get progress information
        const progressResponse = await api.get(
          "/analytics/progress"
        );

        // Get cards that are due for study
        const dueResponse = await api.get("/study/due");

        console.log("Decks:", decksResponse.data);
        console.log("Progress:", progressResponse.data);
        console.log("Due cards:", dueResponse.data);

        // -----------------------------
        // TOTAL DECKS
        // -----------------------------
        const decksData = Array.isArray(decksResponse.data)
          ? decksResponse.data
          : decksResponse.data?.decks || [];

        // -----------------------------
        // PROGRESS
        // -----------------------------
        const progressData = progressResponse.data || {};

        // -----------------------------
        // DUE CARDS
        // -----------------------------
        let dueCards = 0;

        if (Array.isArray(dueResponse.data)) {
          dueCards = dueResponse.data.length;
        } else if (Array.isArray(dueResponse.data?.cards)) {
          dueCards = dueResponse.data.cards.length;
        } else if (typeof dueResponse.data?.count === "number") {
          dueCards = dueResponse.data.count;
        }

        setStats({
          totalDecks: decksData.length,

          totalFlashcards:
            progressData.totalCards ?? 0,

          masteredCards:
            progressData.masteredCards ?? 0,

          dueCards: dueCards,

          streak:
            progressData.streak ??
            progressData.currentStreak ??
            0,

          progressPercentage:
            progressData.progressPercentage ?? 0,
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
  }, []);

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
          <h1>Hello, User!</h1>
          <p>Welcome back to your language journey.</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Study Card */}
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

      {/* Progress */}
      <div className="progress-section">
        <h3>Learning Progress</h3>

        <p>
          {stats.progressPercentage}% completed
        </p>
      </div>

    </div>
  );
}

export default Dashboard;