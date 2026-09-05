
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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../services/api";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const [stats, setStats] = useState({
    totalDecks: 0,
    totalFlashcards: 0,
    masteredCards: 0,
    dueCount: 0,
    streak: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const userId = user?.id || user?.userId;

        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await api.get(
          `/analytics/progress?userId=${userId}`
        );

        const data = response?.data || {};

        setStats({
          totalDecks: data.totalDecks ?? 0,
          totalFlashcards: data.totalFlashcards ?? 0,
          masteredCards: data.masteredCards ?? 0,
          dueCount: data.dueCount ?? data.dueCards ?? 0,
          streak: data.streak ?? 0,
        });
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);

        setStats({
          totalDecks: 0,
          totalFlashcards: 0,
          masteredCards: 0,
          dueCount: 0,
          streak: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user]);

  return (
    <div className="page-container">
      <section className="welcome-section">
        <h1>
          Hello, {user?.username || "User"}!
        </h1>

        <p>
          Welcome back to your language journey.
        </p>
      </section>

      <section className="study-ready">
        <h2>Ready to study?</h2>

        <p>
          You have {stats.dueCount} cards waiting for review.
        </p>

        <Link
          className="primary-button"
          to="/study"
        >
          Start Session
        </Link>
      </section>

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
          <p>{stats.dueCount}</p>
        </div>

        <div className="stat-card">
          <h3>Streak</h3>
          <p>{stats.streak}</p>
        </div>
      </div>

      {loading && (
        <p className="loading-message">
          Loading dashboard...
        </p>
      )}
    </div>
  );
}

export default Dashboard;
