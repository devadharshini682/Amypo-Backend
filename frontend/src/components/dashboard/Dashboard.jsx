
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
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../services/api";

// function Dashboard() {
//   const [stats, setStats] = useState({
//     totalDecks: 0,
//     totalFlashcards: 0,
//     masteredCards: 0,
//     dueCards: 0,
//     streak: 0,
//     progressPercentage: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadDashboard = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         // --------------------------------
//         // 1. LOAD TOTAL DECKS
//         // --------------------------------
//         let totalDecks = 0;

//         try {
//           const decksResponse = await api.get("/decks");

//           console.log("Dashboard - Decks:", decksResponse.data);

//           const decksData = Array.isArray(decksResponse.data)
//             ? decksResponse.data
//             : decksResponse.data?.decks || [];

//           totalDecks = decksData.length;
//         } catch (err) {
//           console.error("Failed to load decks:", err);
//         }

//         // --------------------------------
//         // 2. LOAD PROGRESS
//         // --------------------------------
//         let totalFlashcards = 0;
//         let masteredCards = 0;
//         let progressPercentage = 0;

//         try {
//           const progressResponse = await api.get("/analytics/progress");

//           console.log(
//             "Dashboard - Progress:",
//             progressResponse.data
//           );

//           const progressData = progressResponse.data || {};

//           totalFlashcards = progressData.totalCards ?? 0;
//           masteredCards = progressData.masteredCards ?? 0;
//           progressPercentage =
//             progressData.progressPercentage ?? 0;
//         } catch (err) {
//           console.error("Failed to load progress:", err);
//         }

//         // --------------------------------
//         // 3. LOAD DUE CARDS
//         // --------------------------------
//         let dueCards = 0;

//         try {
//           // Current logged-in user: disha
//           // Database user ID: 10
//           const userId = 10;

//           const dueResponse = await api.get(
//             `/study/due?userId=${userId}`
//           );

//           console.log(
//             "Dashboard - Due cards:",
//             dueResponse.data
//           );

//           if (Array.isArray(dueResponse.data)) {
//             dueCards = dueResponse.data.length;
//           } else if (
//             Array.isArray(dueResponse.data?.cards)
//           ) {
//             dueCards = dueResponse.data.cards.length;
//           } else if (
//             typeof dueResponse.data?.count === "number"
//           ) {
//             dueCards = dueResponse.data.count;
//           }
//         } catch (err) {
//           console.error(
//             "Failed to load due cards:",
//             err
//           );

//           dueCards = 0;
//         }

//         // --------------------------------
//         // 4. UPDATE DASHBOARD
//         // --------------------------------
//         setStats({
//           totalDecks,
//           totalFlashcards,
//           masteredCards,
//           dueCards,
//           streak: 0,
//           progressPercentage,
//         });
//       } catch (err) {
//         console.error("Dashboard error:", err);

//         setError(
//           "Unable to load dashboard data."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, []);

//   // --------------------------------
//   // LOADING SCREEN
//   // --------------------------------
//   if (loading) {
//     return (
//       <div className="page-container">
//         <h1>Loading dashboard...</h1>
//       </div>
//     );
//   }

//   // --------------------------------
//   // DASHBOARD UI
//   // --------------------------------
//   return (
//     <div className="page-container">

//       {/* HEADER */}
//       <div className="page-header">
//         <div>
//           <h1>Hello, User!</h1>

//           <p>
//             Welcome back to your language journey.
//           </p>
//         </div>
//       </div>

//       {/* ERROR MESSAGE */}
//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//       {/* STUDY CARD */}
//       <div className="study-card">
//         <h2>Ready to study?</h2>

//         <p>
//           You have{" "}
//           <strong>{stats.dueCards}</strong>{" "}
//           cards waiting for review.
//         </p>

//         <Link
//           to="/study"
//           className="primary-button"
//         >
//           Start Session
//         </Link>
//       </div>

//       {/* STAT CARDS */}
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
//           <p>{stats.dueCards}</p>
//         </div>

//         <div className="stat-card">
//           <h3>Streak</h3>
//           <p>{stats.streak}</p>
//         </div>

//       </div>

//       {/* PROGRESS */}
//       <div className="progress-section">
//         <h3>Learning Progress</h3>

//         <p>
//           {stats.progressPercentage}% completed
//         </p>
//       </div>

//     </div>
//   );
// }

// export default Dashboard;
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../services/api";

// function Dashboard() {
//   const [stats, setStats] = useState({
//     totalDecks: 0,
//     totalFlashcards: 0,
//     masteredCards: 0,
//     dueCards: 0,
//     streak: 0,
//     progressPercentage: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadDashboard = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         let totalDecks = 0;

//         try {
//           const decksResponse = await api.get("/decks");

//           const decksData = Array.isArray(
//             decksResponse.data
//           )
//             ? decksResponse.data
//             : decksResponse.data?.decks || [];

//           totalDecks = decksData.length;
//         } catch (err) {
//           console.error(
//             "Failed to load decks:",
//             err
//           );
//         }

//         let totalFlashcards = 0;
//         let masteredCards = 0;
//         let progressPercentage = 0;

//         try {
//           const progressResponse =
//             await api.get(
//               "/analytics/progress"
//             );

//           const progressData =
//             progressResponse.data || {};

//           totalFlashcards =
//             progressData.totalCards ?? 0;

//           masteredCards =
//             progressData.masteredCards ?? 0;

//           progressPercentage =
//             progressData.progressPercentage ?? 0;
//         } catch (err) {
//           console.error(
//             "Failed to load progress:",
//             err
//           );
//         }

//         let dueCards = 0;

//         try {
//           const userId = 10;

//           const dueResponse =
//             await api.get(
//               `/study/due?userId=${userId}`
//             );

//           if (
//             Array.isArray(
//               dueResponse.data
//             )
//           ) {
//             dueCards =
//               dueResponse.data.length;
//           } else if (
//             Array.isArray(
//               dueResponse.data?.cards
//             )
//           ) {
//             dueCards =
//               dueResponse.data.cards.length;
//           } else if (
//             typeof dueResponse.data?.count ===
//             "number"
//           ) {
//             dueCards =
//               dueResponse.data.count;
//           }
//         } catch (err) {
//           console.error(
//             "Failed to load due cards:",
//             err
//           );
//         }

//         setStats({
//           totalDecks,
//           totalFlashcards,
//           masteredCards,
//           dueCards,
//           streak: 0,
//           progressPercentage,
//         });
//       } catch (err) {
//         console.error(
//           "Dashboard error:",
//           err
//         );

//         setError(
//           "Unable to load dashboard data."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, []);

//   if (loading) {
//     return (
//       <div className="page-container">
//         <div className="dashboard-loading">
//           Loading dashboard...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">

//       {/* HEADER */}

//       <div className="page-header">
//         <div>
//           <span className="dashboard-label">
//             LEARNING DASHBOARD
//           </span>

//           <h1>
//             Hello, User!
//           </h1>

//           <p>
//             Welcome back to your language
//             learning journey.
//           </p>
//         </div>
//       </div>

//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//       {/* STUDY CARD */}

//       <div className="study-card">

//         <div>
//           <span className="study-card-label">
//             READY TO LEARN?
//           </span>

//           <h2>
//             Continue your study session
//           </h2>

//           <p>
//             You have{" "}
//             <strong>
//               {stats.dueCards}
//             </strong>{" "}
//             cards waiting for review.
//           </p>
//         </div>

//         <Link
//           to="/study"
//           className="primary-button"
//         >
//           Start Session
//         </Link>

//       </div>

//       {/* STAT CARDS */}

//       <div className="stats-grid">

//         <div className="stat-card deck-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">
//               ▣
//             </span>

//             <span className="stat-title">
//               TOTAL DECKS
//             </span>
//           </div>

//           <p className="stat-value">
//             {stats.totalDecks}
//           </p>

//           <span className="stat-description">
//             Learning collections
//           </span>
//         </div>

//         <div className="stat-card flashcard-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">
//               ▤
//             </span>

//             <span className="stat-title">
//               FLASHCARDS
//             </span>
//           </div>

//           <p className="stat-value">
//             {stats.totalFlashcards}
//           </p>

//           <span className="stat-description">
//             Total cards
//           </span>
//         </div>

//         <div className="stat-card mastered-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">
//               ✓
//             </span>

//             <span className="stat-title">
//               MASTERED
//             </span>
//           </div>

//           <p className="stat-value">
//             {stats.masteredCards}
//           </p>

//           <span className="stat-description">
//             Cards completed
//           </span>
//         </div>

//         <div className="stat-card due-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">
//               !
//             </span>

//             <span className="stat-title">
//               DUE FOR REVIEW
//             </span>
//           </div>

//           <p className="stat-value">
//             {stats.dueCards}
//           </p>

//           <span className="stat-description">
//             Cards to review
//           </span>
//         </div>

//         <div className="stat-card streak-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">
//               ★
//             </span>

//             <span className="stat-title">
//               STREAK
//             </span>
//           </div>

//           <p className="stat-value">
//             {stats.streak}
//           </p>

//           <span className="stat-description">
//             Days of learning
//           </span>
//         </div>

//       </div>

//       {/* LEARNING PROGRESS */}

//       <div className="progress-section">

//         <div className="progress-header">

//           <div>
//             <span className="dashboard-label">
//               LEARNING GOAL
//             </span>

//             <h3>
//               Learning Progress
//             </h3>

//             <p>
//               Keep reviewing your cards
//               to improve your progress.
//             </p>
//           </div>

//           <strong className="progress-percentage">
//             {Math.round(
//               stats.progressPercentage
//             )}
//             %
//           </strong>

//         </div>

//         <div className="dashboard-progress-bar">
//           <div
//             className="dashboard-progress-fill"
//             style={{
//               width: `${Math.min(
//                 Math.max(
//                   stats.progressPercentage,
//                   0
//                 ),
//                 100
//               )}%`,
//             }}
//           />
//         </div>

//         <div className="progress-footer">
//           <span>
//             {Math.round(
//               stats.progressPercentage
//             )}
//             % completed
//           </span>

//           <strong>
//             {Math.round(
//               stats.progressPercentage
//             )}
//             % completed
//           </strong>
//         </div>

//       </div>

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
      setLoading(true);
      setError("");

      try {
        // --------------------------------
        // 1. LOAD TOTAL DECKS
        // --------------------------------
        let totalDecks = 0;

        try {
          const decksResponse = await api.get("/decks");

          console.log(
            "Dashboard - Decks:",
            decksResponse.data
          );

          const decksData = Array.isArray(
            decksResponse.data
          )
            ? decksResponse.data
            : decksResponse.data?.decks || [];

          totalDecks = decksData.length;
        } catch (err) {
          console.error(
            "Failed to load decks:",
            err
          );
        }

        // --------------------------------
        // 2. LOAD PROGRESS
        // --------------------------------
        let totalFlashcards = 0;
        let masteredCards = 0;
        let progressPercentage = 0;

        try {
          const progressResponse =
            await api.get(
              "/analytics/progress"
            );

          console.log(
            "Dashboard - Progress:",
            progressResponse.data
          );

          const progressData =
            progressResponse.data || {};

          totalFlashcards =
            progressData.totalCards ?? 0;

          masteredCards =
            progressData.masteredCards ?? 0;

          progressPercentage =
            progressData.progressPercentage ?? 0;
        } catch (err) {
          console.error(
            "Failed to load progress:",
            err
          );
        }

        // --------------------------------
        // 3. LOAD DUE CARDS
        // --------------------------------
        let dueCards = 0;

        try {
          // Current user ID used by the existing application.
          const userId = 10;

          const dueResponse =
            await api.get(
              `/study/due?userId=${userId}`
            );

          console.log(
            "Dashboard - Due cards:",
            dueResponse.data
          );

          if (
            Array.isArray(
              dueResponse.data
            )
          ) {
            dueCards =
              dueResponse.data.length;
          } else if (
            Array.isArray(
              dueResponse.data?.cards
            )
          ) {
            dueCards =
              dueResponse.data.cards.length;
          } else if (
            typeof dueResponse.data?.count ===
            "number"
          ) {
            dueCards =
              dueResponse.data.count;
          }
        } catch (err) {
          console.error(
            "Failed to load due cards:",
            err
          );

          dueCards = 0;
        }

        // --------------------------------
        // 4. UPDATE DASHBOARD
        // --------------------------------
        setStats({
          totalDecks,
          totalFlashcards,
          masteredCards,
          dueCards,
          streak: 0,
          progressPercentage,
        });
      } catch (err) {
        console.error(
          "Dashboard error:",
          err
        );

        setError(
          "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // --------------------------------
  // LOADING SCREEN
  // --------------------------------
  if (loading) {
    return (
      <div className="page-container">
        <h1>
          Loading dashboard...
        </h1>
      </div>
    );
  }

  // --------------------------------
  // DASHBOARD UI
  // --------------------------------
  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>
            Hello, User!
          </h1>

          <p>
            Welcome back to your language journey.
          </p>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* STUDY CARD */}
      <div className="study-card">
        <h2>
          Ready to study?
        </h2>

        <p>
          You have{" "}
          <strong>
            {stats.dueCards}
          </strong>{" "}
          cards waiting for review.
        </p>

        <Link
          to="/study?all=true"
          className="primary-button"
        >
          Start Session
        </Link>
      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>
            Total Decks
          </h3>

          <p>
            {stats.totalDecks}
          </p>
        </div>

        <div className="stat-card">
          <h3>
            Total Flashcards
          </h3>

          <p>
            {stats.totalFlashcards}
          </p>
        </div>

        <div className="stat-card">
          <h3>
            Mastered Cards
          </h3>

          <p>
            {stats.masteredCards}
          </p>
        </div>

        <div className="stat-card">
          <h3>
            Due Cards
          </h3>

          <p>
            {stats.dueCards}
          </p>
        </div>

        <div className="stat-card">
          <h3>
            Streak
          </h3>

          <p>
            {stats.streak}
          </p>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="progress-section">
        <h3>
          Learning Progress
        </h3>

        <p>
          {stats.progressPercentage}% completed
        </p>
      </div>

    </div>
  );
}

export default Dashboard;