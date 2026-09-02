import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import studyService from "../../services/studyService";

import {
  setCards,
  nextCard,
  increaseScore,
  resetStudy,
} from "../../store/slices/studySlice";

function StudyMode() {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const {
    cards,
    currentIndex,
    score,
  } = useSelector(
    (state) => state.study
  );

  const [showAnswer, setShowAnswer] =
    useState(false);

  const [finished, setFinished] =
    useState(false);

  useEffect(() => {
    const loadCards = async () => {
      if (!user?.id) {
        return;
      }

      try {
        const response =
          await studyService.getDueCards(
            user.id
          );

        dispatch(
          setCards(response.data || [])
        );
      } catch (error) {
        console.error(
          "Unable to load study cards",
          error
        );
      }
    };

    loadCards();

    return () => {
      dispatch(resetStudy());
    };
  }, [dispatch, user]);

  if (finished) {
    return (
      <div className="study-page">
        <div className="study-card">
          <h1>Session Completed!</h1>

          <p>
            Your score:
          </p>

          <div className="score">
            {score} / {cards.length}
          </div>

          <Link
            to="/dashboard"
            className="primary-button"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="study-page">
        <div className="study-card">
          <h1>No Cards Due</h1>

          <p>
            You have no cards waiting
            for review.
          </p>

          <Link
            to="/dashboard"
            className="secondary-button"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentCard =
    cards[currentIndex];

  const handleCorrect = () => {
    dispatch(increaseScore());
    moveNext();
  };

  const handleWrong = () => {
    moveNext();
  };

  const moveNext = async () => {
    setShowAnswer(false);

    if (
      currentIndex ===
      cards.length - 1
    ) {
      setFinished(true);

      try {
        await studyService.completeSession(
          {
            userId: user.id,
            score:
              score +
              (currentIndex ===
              cards.length - 1
                ? 1
                : 0),
          }
        );
      } catch (error) {
        console.error(
          "Unable to submit session"
        );
      }

      return;
    }

    dispatch(nextCard());
  };

  return (
    <div className="study-page">
      <div className="study-card">
        <div className="study-progress">
          Card {currentIndex + 1} of{" "}
          {cards.length}
        </div>

        <h1>Study Mode</h1>

        <div className="flashcard">
          <div className="flashcard-front">
            <span>Question</span>

            <h2>
              {currentCard.front}
            </h2>
          </div>

          {showAnswer && (
            <div className="flashcard-back">
              <span>Answer</span>

              <h2>
                {currentCard.back}
              </h2>

              {currentCard.pronunciation && (
                <p>
                  Pronunciation:{" "}
                  {
                    currentCard.pronunciation
                  }
                </p>
              )}
            </div>
          )}
        </div>

        {!showAnswer ? (
          <button
            className="primary-button"
            onClick={() =>
              setShowAnswer(true)
            }
          >
            Show Answer
          </button>
        ) : (
          <div className="study-actions">
            <button
              className="wrong-button"
              onClick={
                handleWrong
              }
            >
              Again
            </button>

            <button
              className="correct-button"
              onClick={
                handleCorrect
              }
            >
              I Know
            </button>
          </div>
        )}

        <p className="current-score">
          Score: {score}
        </p>
      </div>
    </div>
  );
}

export default StudyMode;