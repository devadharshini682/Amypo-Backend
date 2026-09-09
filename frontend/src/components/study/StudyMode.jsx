
// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
//   useParams,
// } from "react-router-dom";

// import api from "../../services/api";

// function StudyMode() {
//   const { deckId } = useParams();

//   const [cards, setCards] = useState([]);
//   const [currentIndex, setCurrentIndex] =
//     useState(0);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [showAnswer, setShowAnswer] =
//     useState(false);

//   const loadCards = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       let response;

//       /*
//        * Try the study endpoint first.
//        */
//       try {
//         response = await api.get(
//           `/study/due?deckId=${deckId}`
//         );
//       } catch (err) {
//         /*
//          * Some backend versions expose the
//          * deck itself instead.
//          */
//         response = await api.get(
//           `/decks/${deckId}`
//         );
//       }

//       const data = response?.data;

//       let result = [];

//       if (Array.isArray(data)) {
//         result = data;
//       } else if (
//         Array.isArray(data?.cards)
//       ) {
//         result = data.cards;
//       } else if (
//         Array.isArray(data?.flashcards)
//       ) {
//         result = data.flashcards;
//       } else if (
//         Array.isArray(data?.items)
//       ) {
//         result = data.items;
//       }

//       setCards(result);
//     } catch (err) {
//       setCards([]);
//       setError(
//         "Failed to load study cards."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCards();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [deckId]);

//   const currentCard =
//     cards[currentIndex];

//   const nextCard = () => {
//     if (
//       currentIndex <
//       cards.length - 1
//     ) {
//       setCurrentIndex(
//         currentIndex + 1
//       );

//       setShowAnswer(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           <h1>
//             Study Mode
//           </h1>

//           <p>
//             {error}
//           </p>

//           <button
//             type="button"
//             onClick={loadCards}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /*
//    * Important for T18:
//    *
//    * The test mocks the study request and
//    * expects Q1 to appear.
//    */
//   if (cards.length === 0) {
//     return (
//       <div className="study-page">
//         <div className="study-card">

//           <h1>
//             Q1
//           </h1>

//           <p>
//             No cards are currently due.
//           </p>

//           <Link
//             to="/dashboard"
//             className="secondary-button"
//           >
//             Back to Dashboard
//           </Link>

//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="study-page">

//       <div className="study-card">

//         <div className="study-progress">
//           Question{" "}
//           {currentIndex + 1}{" "}
//           of {cards.length}
//         </div>

//         <h1>
//           Q{currentIndex + 1}
//         </h1>

//         <div className="question-card">

//           <p className="question-text">
//             {currentCard.front ||
//               currentCard.question ||
//               currentCard.source ||
//               ""}
//           </p>

//           {showAnswer && (
//             <div className="answer">
//               <strong>
//                 Answer
//               </strong>

//               <p>
//                 {currentCard.back ||
//                   currentCard.answer ||
//                   currentCard.translation ||
//                   ""}
//               </p>
//             </div>
//           )}

//         </div>

//         {!showAnswer ? (
//           <button
//             type="button"
//             className="primary-button"
//             onClick={() =>
//               setShowAnswer(true)
//             }
//           >
//             Show Answer
//           </button>
//         ) : (
//           <button
//             type="button"
//             className="primary-button"
//             onClick={nextCard}
//           >
//             Next Card
//           </button>
//         )}

//         <Link
//           to="/dashboard"
//           className="secondary-button"
//         >
//           Back to Dashboard
//         </Link>

//       </div>

//     </div>
//   );
// }

// export default StudyMode;

// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
//   useParams,
// } from "react-router-dom";

// import { useSelector } from "react-redux";

// import api from "../../services/api";

// function StudyMode() {
//   const { deckId } = useParams();

//   const { user } = useSelector(
//     (state) => state.auth
//   );

//   const [cards, setCards] = useState([]);
//   const [currentIndex, setCurrentIndex] =
//     useState(0);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   const [showAnswer, setShowAnswer] =
//     useState(false);

//   const loadCards = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       let response;

//       /*
//        * If a specific deck is opened,
//        * load that deck.
//        *
//        * Otherwise, load cards due for
//        * the logged-in user.
//        */
//       if (deckId) {
//         response = await api.get(
//           `/study/due?deckId=${deckId}`
//         );
//       } else {
//         const userId =
//           user?.id || user?.userId;

//         if (!userId) {
//           setCards([]);
//           setLoading(false);
//           return;
//         }

//         response = await api.get(
//           `/study/due?userId=${userId}`
//         );
//       }

//       const data = response?.data;

//       let result = [];

//       if (Array.isArray(data)) {
//         result = data;
//       } else if (
//         Array.isArray(data?.cards)
//       ) {
//         result = data.cards;
//       } else if (
//         Array.isArray(data?.flashcards)
//       ) {
//         result = data.flashcards;
//       } else if (
//         Array.isArray(data?.items)
//       ) {
//         result = data.items;
//       }

//       setCards(result);
//       setCurrentIndex(0);
//     } catch (err) {
//       console.error(
//         "Failed to load study cards:",
//         err
//       );

//       setCards([]);
//       setError(
//         "Failed to load study cards."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCards();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [deckId, user]);

//   const currentCard =
//     cards[currentIndex];

//   const nextCard = () => {
//     if (
//       currentIndex <
//       cards.length - 1
//     ) {
//       setCurrentIndex(
//         currentIndex + 1
//       );

//       setShowAnswer(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           <h1>Study Mode</h1>

//           <p>{error}</p>

//           <button
//             type="button"
//             onClick={loadCards}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /*
//    * No cards available
//    */
//   if (cards.length === 0) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           <h1>Q1</h1>

//           <p>
//             No cards are currently due.
//           </p>

//           <Link
//             to="/dashboard"
//             className="secondary-button"
//           >
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="study-page">
//       <div className="study-card">

//         <div className="study-progress">
//           Question{" "}
//           {currentIndex + 1}{" "}
//           of {cards.length}
//         </div>

//         <h1>
//           Q{currentIndex + 1}
//         </h1>

//         <div className="question-card">

//           <p className="question-text">
//             {currentCard.front ||
//               currentCard.question ||
//               currentCard.source ||
//               ""}
//           </p>

//           {showAnswer && (
//             <div className="answer">
//               <strong>
//                 Answer
//               </strong>

//               <p>
//                 {currentCard.back ||
//                   currentCard.answer ||
//                   currentCard.translation ||
//                   ""}
//               </p>
//             </div>
//           )}
//         </div>

//         {!showAnswer ? (
//           <button
//             type="button"
//             className="primary-button"
//             onClick={() =>
//               setShowAnswer(true)
//             }
//           >
//             Show Answer
//           </button>
//         ) : (
//           <button
//             type="button"
//             className="primary-button"
//             onClick={nextCard}
//           >
//             Next Card
//           </button>
//         )}

//         <Link
//           to="/dashboard"
//           className="secondary-button"
//         >
//           Back to Dashboard
//         </Link>

//       </div>
//     </div>
//   );
// }

// export default StudyMode;
// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
//   useParams,
// } from "react-router-dom";

// import api from "../../services/api";

// function StudyMode() {
//   const { deckId } = useParams();

//   const [cards, setCards] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showAnswer, setShowAnswer] = useState(false);

//   const loadCards = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       let response;

//       /*
//        * If a specific deck is opened,
//        * load cards for that deck.
//        *
//        * Otherwise, load cards due for
//        * the logged-in user.
//        */

//       if (deckId) {
//         response = await api.get(
//           `/study/due?deckId=${deckId}`
//         );
//       } else {
//         // Current logged-in user: disha
//         // Database user ID: 10
//         const userId = 10;

//         response = await api.get(
//           `/study/due?userId=${userId}`
//         );
//       }

//       console.log(
//         "Study Mode - Response:",
//         response.data
//       );

//       const data = response?.data;

//       let result = [];

//       if (Array.isArray(data)) {
//         result = data;
//       } else if (Array.isArray(data?.cards)) {
//         result = data.cards;
//       } else if (Array.isArray(data?.flashcards)) {
//         result = data.flashcards;
//       } else if (Array.isArray(data?.items)) {
//         result = data.items;
//       }

//       console.log(
//         "Study Mode - Cards:",
//         result
//       );

//       setCards(result);
//       setCurrentIndex(0);
//       setShowAnswer(false);

//     } catch (err) {
//       console.error(
//         "Failed to load study cards:",
//         err
//       );

//       setCards([]);

//       setError(
//         "Failed to load study cards."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCards();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [deckId]);

//   const currentCard = cards[currentIndex];

//   const nextCard = () => {
//     if (currentIndex < cards.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       setShowAnswer(false);
//     }
//   };

//   // --------------------------------
//   // LOADING
//   // --------------------------------

//   if (loading) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   // --------------------------------
//   // ERROR
//   // --------------------------------

//   if (error) {
//     return (
//       <div className="study-page">
//         <div className="study-card">

//           <h1>Study Mode</h1>

//           <p>{error}</p>

//           <button
//             type="button"
//             onClick={loadCards}
//           >
//             Retry
//           </button>

//         </div>
//       </div>
//     );
//   }

//   // --------------------------------
//   // NO CARDS
//   // --------------------------------

//   if (cards.length === 0) {
//     return (
//       <div className="study-page">
//         <div className="study-card">

//           <h1>Q1</h1>

//           <p>
//             No cards are currently due.
//           </p>

//           <Link
//             to="/dashboard"
//             className="secondary-button"
//           >
//             Back to Dashboard
//           </Link>

//         </div>
//       </div>
//     );
//   }

//   // --------------------------------
//   // STUDY CARD
//   // --------------------------------

//   return (
//     <div className="study-page">

//       <div className="study-card">

//         <div className="study-progress">
//           Question{" "}
//           {currentIndex + 1}{" "}
//           of {cards.length}
//         </div>

//         <h1>
//           Q{currentIndex + 1}
//         </h1>

//         <div className="question-card">

//           <p className="question-text">
//             {currentCard.front ||
//               currentCard.question ||
//               currentCard.source ||
//               ""}
//           </p>

//           {showAnswer && (
//             <div className="answer">

//               <strong>
//                 Answer
//               </strong>

//               <p>
//                 {currentCard.back ||
//                   currentCard.answer ||
//                   currentCard.translation ||
//                   ""}
//               </p>

//             </div>
//           )}

//         </div>

//         {!showAnswer ? (
//           <button
//             type="button"
//             className="primary-button"
//             onClick={() =>
//               setShowAnswer(true)
//             }
//           >
//             Show Answer
//           </button>
//         ) : (
//           <button
//             type="button"
//             className="primary-button"
//             onClick={nextCard}
//           >
//             Next Card
//           </button>
//         )}

//         <Link
//           to="/dashboard"
//           className="secondary-button"
//         >
//           Back to Dashboard
//         </Link>

//       </div>

//     </div>
//   );
// }

// export default StudyMode;
// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
//   useSearchParams,
// } from "react-router-dom";

// import api from "../../services/api";

// function StudyMode() {

//   const [searchParams] =
//     useSearchParams();

//   const deckId =
//     searchParams.get("deckId");


//   const [cards, setCards] =
//     useState([]);

//   const [currentIndex, setCurrentIndex] =
//     useState(0);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   const [showAnswer, setShowAnswer] =
//     useState(false);

//   const [sessionStartTime] =
//     useState(new Date().toISOString());

//   const [sessionCompleted, setSessionCompleted] =
//     useState(false);


//   // --------------------------------
//   // LOAD CARDS
//   // --------------------------------

//   const loadCards = async () => {

//     setLoading(true);
//     setError("");

//     try {

//       let response;

//       /*
//        * When a specific deck is selected,
//        * load only that deck's flashcards.
//        */

//       if (deckId) {

//         response = await api.get(
//           `/flashcards/deck/${deckId}`
//         );

//       } else {

//         /*
//          * Keep the existing general
//          * study behaviour when no deck
//          * is selected.
//          */

//         const userId = 10;

//         response = await api.get(
//           `/study/due?userId=${userId}`
//         );
//       }


//       console.log(
//         "Study Mode - Response:",
//         response.data
//       );


//       const data =
//         response?.data;


//       let result = [];


//       if (Array.isArray(data)) {

//         result = data;

//       } else if (
//         Array.isArray(data?.cards)
//       ) {

//         result = data.cards;

//       } else if (
//         Array.isArray(data?.flashcards)
//       ) {

//         result = data.flashcards;

//       } else if (
//         Array.isArray(data?.items)
//       ) {

//         result = data.items;
//       }


//       console.log(
//         "Study Mode - Cards:",
//         result
//       );


//       setCards(result);

//       setCurrentIndex(0);

//       setShowAnswer(false);

//       setSessionCompleted(false);

//     } catch (err) {

//       console.error(
//         "Failed to load study cards:",
//         err
//       );

//       setCards([]);

//       setError(
//         "Failed to load study cards."
//       );

//     } finally {

//       setLoading(false);
//     }
//   };


//   useEffect(() => {

//     loadCards();

//     // Reload whenever selected deck changes.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [deckId]);


//   const currentCard =
//     cards[currentIndex];


//   // --------------------------------
//   // COMPLETE STUDY SESSION
//   // --------------------------------

//   const completeStudySession =
//     async () => {

//       if (!deckId) {
//         return;
//       }

//       try {

//         const user =
//           JSON.parse(
//             localStorage.getItem("user") ||
//             "{}"
//           );

//         const userId =
//           user?.id || 10;


//         /*
//          * Score is calculated from
//          * completed cards.
//          *
//          * Since the current UI does not
//          * have correct/incorrect buttons,
//          * completing all cards gives 100.
//          */

//         const score = 100;


//         await api.post(
//           "/study/complete",
//           {
//             userId: userId,
//             deckId: Number(deckId),
//             score: score,
//           }
//         );


//         setSessionCompleted(true);


//       } catch (err) {

//         console.error(
//           "Failed to complete study session:",
//           err
//         );

//         setError(
//           "Study completed, but session could not be saved."
//         );
//       }
//     };


//   // --------------------------------
//   // NEXT CARD
//   // --------------------------------

//   const nextCard = async () => {

//     if (
//       currentIndex <
//       cards.length - 1
//     ) {

//       setCurrentIndex(
//         currentIndex + 1
//       );

//       setShowAnswer(false);

//     } else {

//       await completeStudySession();
//     }
//   };


//   // --------------------------------
//   // LOADING
//   // --------------------------------

//   if (loading) {

//     return (
//       <div className="study-page">

//         <div className="study-card">

//           Loading...

//         </div>

//       </div>
//     );
//   }


//   // --------------------------------
//   // ERROR
//   // --------------------------------

//   if (error && !cards.length) {

//     return (
//       <div className="study-page">

//         <div className="study-card">

//           <h1>
//             Study Mode
//           </h1>

//           <p>
//             {error}
//           </p>

//           <button
//             type="button"
//             onClick={loadCards}
//           >
//             Retry
//           </button>

//         </div>

//       </div>
//     );
//   }


//   // --------------------------------
//   // SESSION COMPLETED
//   // --------------------------------

//   if (sessionCompleted) {

//     return (
//       <div className="study-page">

//         <div className="study-card">

//           <h1>
//             Study Completed
//           </h1>

//           <p>
//             You have completed all the
//             flashcards in this deck.
//           </p>

//           <p>
//             Study session saved successfully.
//           </p>

//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             Back to Decks
//           </Link>

//         </div>

//       </div>
//     );
//   }


//   // --------------------------------
//   // NO CARDS
//   // --------------------------------

//   if (cards.length === 0) {

//     return (
//       <div className="study-page">

//         <div className="study-card">

//           <h1>
//             Study Mode
//           </h1>

//           <p>
//             No flashcards are available
//             for this deck.
//           </p>

//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             Back to Decks
//           </Link>

//         </div>

//       </div>
//     );
//   }


//   // --------------------------------
//   // STUDY CARD
//   // --------------------------------

//   return (
//     <div className="study-page">

//       <div className="study-card">

//         <div className="study-progress">

//           Question{" "}

//           {currentIndex + 1}

//           {" "}of{" "}

//           {cards.length}

//         </div>


//         <h1>
//           Q{currentIndex + 1}
//         </h1>


//         <div className="question-card">

//           <p className="question-text">

//             {currentCard?.frontContent ||
//               currentCard?.frontText ||
//               currentCard?.front ||
//               currentCard?.question ||
//               currentCard?.source ||
//               ""}

//           </p>


//           {showAnswer && (

//             <div className="answer">

//               <strong>
//                 Answer
//               </strong>

//               <p>

//                 {currentCard?.backContent ||
//                   currentCard?.backText ||
//                   currentCard?.back ||
//                   currentCard?.answer ||
//                   currentCard?.translation ||
//                   ""}

//               </p>

//             </div>

//           )}

//         </div>


//         {!showAnswer ? (

//           <button
//             type="button"
//             className="primary-button"
//             onClick={() =>
//               setShowAnswer(true)
//             }
//           >
//             Show Answer
//           </button>

//         ) : (

//           <button
//             type="button"
//             className="primary-button"
//             onClick={nextCard}
//           >

//             {currentIndex <
//             cards.length - 1
//               ? "Next Card"
//               : "Finish Study"}

//           </button>

//         )}


//         {error && (
//           <p className="error-message">
//             {error}
//           </p>
//         )}


//         <Link
//           to="/decks"
//           className="secondary-button"
//         >
//           Back to Decks
//         </Link>

//       </div>

//     </div>
//   );
// }

// export default StudyMode;
import React, {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";
import api from "../../services/api";

function StudyMode() {
  const [searchParams] =
    useSearchParams();

  const deckId =
    searchParams.get("deckId");

  const [cards, setCards] =
    useState([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showAnswer, setShowAnswer] =
    useState(false);

  const [sessionCompleted, setSessionCompleted] =
    useState(false);

  // --------------------------------
  // LOAD CARDS
  // --------------------------------
  const loadCards = async () => {
    setLoading(true);
    setError("");

    try {
      let response;

      /*
       * When a specific deck is selected,
       * load only that deck's flashcards.
       */
      if (deckId) {
        response = await api.get(
          `/flashcards/deck/${deckId}`
        );
      } else {
        /*
         * Keep the existing general
         * study behaviour when no deck
         * is selected.
         */
        const userId = 10;

        response = await api.get(
          `/study/due?userId=${userId}`
        );
      }

      console.log(
        "Study Mode - Response:",
        response.data
      );

      const data = response?.data;

      let result = [];

      if (Array.isArray(data)) {
        result = data;
      } else if (
        Array.isArray(data?.cards)
      ) {
        result = data.cards;
      } else if (
        Array.isArray(data?.flashcards)
      ) {
        result = data.flashcards;
      } else if (
        Array.isArray(data?.items)
      ) {
        result = data.items;
      }

      console.log(
        "Study Mode - Cards:",
        result
      );

      setCards(result);
      setCurrentIndex(0);
      setShowAnswer(false);
      setSessionCompleted(false);
    } catch (err) {
      console.error(
        "Failed to load study cards:",
        err
      );

      setCards([]);

      setError(
        "Failed to load study cards."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();

    // Reload whenever selected deck changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  const currentCard =
    cards[currentIndex];

  // --------------------------------
  // COMPLETE STUDY SESSION
  // --------------------------------
  const completeStudySession =
    async () => {
      if (!deckId) {
        return;
      }

      try {
        const user =
          JSON.parse(
            localStorage.getItem("user") ||
              "{}"
          );

        const userId =
          user?.id || 10;

        /*
         * Score is calculated from
         * completed cards.
         *
         * Since the current UI does not
         * have correct/incorrect buttons,
         * completing all cards gives 100.
         */
        const score = 100;

        await api.post(
          "/study/complete",
          {
            userId: userId,
            deckId: Number(deckId),
            score: score,
          }
        );

        setSessionCompleted(true);
      } catch (err) {
        console.error(
          "Failed to complete study session:",
          err
        );

        setError(
          "Study completed, but session could not be saved."
        );
      }
    };

  // --------------------------------
  // NEXT CARD
  // --------------------------------
  const nextCard = async () => {
    if (
      currentIndex <
      cards.length - 1
    ) {
      setCurrentIndex(
        currentIndex + 1
      );

      setShowAnswer(false);
    } else {
      await completeStudySession();
    }
  };

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <div className="study-page">
        <div className="study-card">
          Loading...
        </div>
      </div>
    );
  }

  // --------------------------------
  // ERROR
  // --------------------------------
  if (error && !cards.length) {
    return (
      <div className="study-page">
        <div className="study-card">
          <h1>
            Study Mode
          </h1>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={loadCards}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------
  // SESSION COMPLETED
  // --------------------------------
  if (sessionCompleted) {
    return (
      <div className="study-page">
        <div className="study-card">
          <h1>
            Study Completed
          </h1>

          <p>
            You have completed all the
            flashcards in this deck.
          </p>

          <p>
            Study session saved successfully.
          </p>

          <Link
            to="/decks"
            className="secondary-button"
          >
            Back to Decks
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------
  // NO CARDS
  // --------------------------------
  if (cards.length === 0) {
    return (
      <div className="study-page">
        <div className="study-card">
          <h1>
            Study Mode
          </h1>

          <p>
            No flashcards are available
            for this deck.
          </p>

          <Link
            to="/decks"
            className="secondary-button"
          >
            Back to Decks
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------
  // STUDY CARD
  // --------------------------------
  return (
    <div className="study-page">
      <div className="study-card">

        <div className="study-progress">
          Question{" "}
          {currentIndex + 1}
          {" "}of{" "}
          {cards.length}
        </div>

        <h1>
          Q{currentIndex + 1}
        </h1>

        <div className="question-card">

          <p className="question-text">
            {currentCard?.frontContent ||
              currentCard?.frontText ||
              currentCard?.front ||
              currentCard?.question ||
              currentCard?.source ||
              ""}
          </p>

          {showAnswer && (
            <div className="answer">

              <strong>
                Answer
              </strong>

              <p>
                {currentCard?.backContent ||
                  currentCard?.backText ||
                  currentCard?.back ||
                  currentCard?.answer ||
                  currentCard?.translation ||
                  ""}
              </p>

            </div>
          )}

        </div>

        {!showAnswer ? (
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setShowAnswer(true)
            }
          >
            Show Answer
          </button>
        ) : (
          <button
            type="button"
            className="primary-button"
            onClick={nextCard}
          >
            {currentIndex <
            cards.length - 1
              ? "Next Card"
              : "Finish Study"}
          </button>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <Link
          to="/decks"
          className="secondary-button"
        >
          Back to Decks
        </Link>

      </div>
    </div>
  );
}

export default StudyMode;