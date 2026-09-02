import React from "react";

function StatCards({
  cardsDue = 0,
  mastered = 0,
  accuracy = 0,
  sessions = 0,
}) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Cards Due</h3>
        <p>{cardsDue}</p>
      </div>

      <div className="stat-card">
        <h3>Mastered</h3>
        <p>{mastered}</p>
      </div>

      <div className="stat-card">
        <h3>Accuracy</h3>
        <p>{accuracy}%</p>
      </div>

      <div className="stat-card">
        <h3>Sessions</h3>
        <p>{sessions}</p>
      </div>
    </div>
  );
}

export default StatCards;