import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import studyService from "../../services/studyService";
import StatCards from "./StatCards";

function Dashboard() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const [progress, setProgress] = useState({});
  const [dueCards, setDueCards] = useState([]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const loadDashboard = async () => {
      try {
        const progressResponse =
          await studyService.getProgress(user.id);

        const dueResponse =
          await studyService.getDueCards(user.id);

        setProgress(
          progressResponse.data || {}
        );

        setDueCards(
          dueResponse.data || []
        );
      } catch (error) {
        console.error(
          "Unable to load dashboard",
          error
        );
      }
    };

    loadDashboard();
  }, [user]);

  const accuracy =
    progress.accuracyRate ??
    progress.accuracy ??
    0;

  const mastered =
    progress.masteredCards ??
    progress.mastered ??
    0;

  const sessions =
    progress.totalSessions ??
    progress.sessions ??
    0;

  return (
    <div className="page-container">
      <section className="welcome-section">
        <h1>
          Hello, {user?.username || "Learner"}!
        </h1>

        <p>
          Welcome back to your language journey.
        </p>
      </section>

      <section className="study-ready">
        <h2>Ready to study?</h2>

        <p>
          You have {dueCards.length} cards
          waiting for review.
        </p>

        <Link
          to="/study"
          className="primary-button"
        >
          Start Session
        </Link>
      </section>

      <StatCards
        cardsDue={dueCards.length}
        mastered={mastered}
        accuracy={accuracy}
        sessions={sessions}
      />
    </div>
  );
}

export default Dashboard;