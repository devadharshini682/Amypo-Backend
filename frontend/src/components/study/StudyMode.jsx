
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
//               "{}"
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

//   const [sessionCompleted, setSessionCompleted] =
//     useState(false);

//   // --------------------------------
//   // UI-ONLY SESSION COUNTS
//   // --------------------------------
//   const [masteredCount, setMasteredCount] =
//     useState(0);

//   const [practiceCount, setPracticeCount] =
//     useState(0);

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

//       console.log(
//         "Study Mode - Cards:",
//         result
//       );

//       setCards(result);
//       setCurrentIndex(0);
//       setShowAnswer(false);
//       setSessionCompleted(false);

//       // Reset UI-only counters
//       setMasteredCount(0);
//       setPracticeCount(0);
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
//               "{}"
//           );

//         const userId =
//           user?.id || 10;

//         /*
//          * Keep the existing session
//          * completion behaviour unchanged.
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

//           <div className="session-result">

//             <div className="result-item">
//               <span>Mastered</span>
//               <strong>
//                 {masteredCount}
//               </strong>
//             </div>

//             <div className="result-item">
//               <span>Need Practice</span>
//               <strong>
//                 {practiceCount}
//               </strong>
//             </div>

//           </div>

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
//   // STUDY PROGRESS
//   // --------------------------------
//   const progress =
//     ((currentIndex + 1) /
//       cards.length) *
//     100;

//   const remainingCards =
//     cards.length -
//     currentIndex -
//     1;

//   // --------------------------------
//   // STUDY CARD
//   // --------------------------------
//   return (
//     <div className="study-page">

//       <div className="study-card">

//         {/* SESSION HEADER */}

//         <div className="study-session-header">

//           <div>
//             <span className="study-label">
//               STUDY SESSION
//             </span>

//             <h1>
//               Question {currentIndex + 1}
//               {" "}of{" "}
//               {cards.length}
//             </h1>
//           </div>

//           <div className="question-number">
//             {currentIndex + 1}
//             <span>
//               /{cards.length}
//             </span>
//           </div>

//         </div>

//         {/* PROGRESS BAR */}

//         <div className="study-progress-container">

//           <div className="study-progress-bar">

//             <div
//               className="study-progress-fill"
//               style={{
//                 width: `${progress}%`,
//               }}
//             />

//           </div>

//           <div className="study-progress-text">
//             <span>
//               {Math.round(progress)}% complete
//             </span>

//             <span>
//               {remainingCards} remaining
//             </span>
//           </div>

//         </div>

//         {/* SESSION STATS */}

//         <div className="session-stats">

//           <div className="session-stat">
//             <span className="stat-icon">
//               ✓
//             </span>

//             <div>
//               <small>
//                 Mastered
//               </small>

//               <strong>
//                 {masteredCount}
//               </strong>
//             </div>
//           </div>

//           <div className="session-stat">
//             <span className="stat-icon practice">
//               !
//             </span>

//             <div>
//               <small>
//                 Need Practice
//               </small>

//               <strong>
//                 {practiceCount}
//               </strong>
//             </div>
//           </div>

//           <div className="session-stat">
//             <span className="stat-icon remaining">
//               ○
//             </span>

//             <div>
//               <small>
//                 Remaining
//               </small>

//               <strong>
//                 {remainingCards}
//               </strong>
//             </div>
//           </div>

//         </div>

//         {/* QUESTION */}

//         <div className="question-card">

//           <span className="question-label">
//             QUESTION
//           </span>

//           <p className="question-text">
//             {currentCard?.frontContent ||
//               currentCard?.frontText ||
//               currentCard?.front ||
//               currentCard?.question ||
//               currentCard?.source ||
//               ""}
//           </p>

//           {/* ANSWER */}

//           {showAnswer && (
//             <div className="answer">

//               <span className="answer-label">
//                 ANSWER
//               </span>

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

//         {/* ACTIONS */}

//         {!showAnswer ? (

//           <button
//             type="button"
//             className="primary-button study-main-button"
//             onClick={() =>
//               setShowAnswer(true)
//             }
//           >
//             Show Answer
//           </button>

//         ) : (

//           <div className="study-actions">

//             <button
//               type="button"
//               className="practice-button"
//               onClick={() => {
//                 setPracticeCount(
//                   (count) => count + 1
//                 );

//                 nextCard();
//               }}
//             >
//               <span>↻</span>
//               Need Practice
//             </button>

//             <button
//               type="button"
//               className="mastered-button"
//               onClick={() => {
//                 setMasteredCount(
//                   (count) => count + 1
//                 );

//                 nextCard();
//               }}
//             >
//               <span>✓</span>
//               I Know This
//             </button>

//           </div>

//         )}

//         {error && (
//           <p className="error-message">
//             {error}
//           </p>
//         )}

//         <Link
//           to="/decks"
//           className="secondary-button back-decks-button"
//         >
//           Back to Decks
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

//       if (deckId) {
//         response = await api.get(
//           `/flashcards/deck/${deckId}`
//         );
//       } else {
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

//       /*
//        * IMPORTANT:
//        * The study API/test can return:
//        *
//        * [
//        *   {
//        *     card: {
//        *       id: 1,
//        *       frontText: "Q1",
//        *       backText: "A1"
//        *     }
//        *   }
//        * ]
//        *
//        * Convert that into:
//        *
//        * [
//        *   {
//        *     id: 1,
//        *     frontText: "Q1",
//        *     backText: "A1"
//        *   }
//        * ]
//        */

//       result = result.map((item) =>
//         item?.card
//           ? item.card
//           : item
//       );

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
//               "{}"
//           );

//         const userId =
//           user?.id || 10;

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

//   if (
//     error &&
//     !cards.length
//   ) {

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

//   const [sessionCompleted, setSessionCompleted] =
//     useState(false);

//   const loadCards = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       let response;

//       if (deckId) {
//         response = await api.get(
//           `/flashcards/deck/${deckId}`
//         );
//       } else {
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

//       /*
//        * Handle API response like:
//        *
//        * {
//        *   card: {
//        *     id: 1,
//        *     frontText: "Q1",
//        *     backText: "A1"
//        *   }
//        * }
//        */

//       result = result.map((item) =>
//         item?.card
//           ? item.card
//           : item
//       );

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

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [deckId]);

//   const currentCard =
//     cards[currentIndex];

//   const completeStudySession =
//     async () => {

//       if (!deckId) {
//         setSessionCompleted(true);
//         return;
//       }

//       try {
//         const user =
//           JSON.parse(
//             localStorage.getItem("user") ||
//               "{}"
//           );

//         const userId =
//           user?.id || 10;

//         await api.post(
//           "/study/complete",
//           {
//             userId: userId,
//             deckId: Number(deckId),
//             score: 100,
//           }
//         );

//         setSessionCompleted(true);

//       } catch (err) {
//         console.error(
//           "Failed to complete study session:",
//           err
//         );

//         setSessionCompleted(true);

//         setError(
//           "Study completed, but session could not be saved."
//         );
//       }
//     };

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

//   if (loading) {
//     return (
//       <div className="study-page">

//         <div className="study-card">
//           Loading...
//         </div>

//       </div>
//     );
//   }

//   if (
//     error &&
//     !cards.length
//   ) {
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

//           {error && (
//             <p className="error-message">
//               {error}
//             </p>
//           )}

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

//   return (
//     <div className="study-page">

//       <div className="study-card">

//         <div className="study-progress">
//           Question{" "}
//           {currentIndex + 1}
//           {" "}of{" "}
//           {cards.length}
//         </div>

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
// import React, { useEffect, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import api from "../../services/api";

// function StudyMode() {
//   const [searchParams] = useSearchParams();
//   const deckId = searchParams.get("deckId");

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [completed, setCompleted] = useState(false);
//   const [shownAnswers, setShownAnswers] = useState({});

//   const loadCards = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       let response;

//       if (deckId) {
//         response = await api.get(`/flashcards/deck/${deckId}`);
//       } else {
//         const userId = 10;
//         response = await api.get(`/study/due?userId=${userId}`);
//       }

//       console.log("Study Mode - Response:", response.data);

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

//       // Handle responses like:
//       // { card: { frontText: "...", backText: "..." } }
//       result = result.map((item) =>
//         item?.card ? item.card : item
//       );

//       console.log("Study Mode - Cards:", result);

//       setCards(result);
//       setShownAnswers({});
//       setCompleted(false);
//     } catch (err) {
//       console.error("Failed to load study cards:", err);

//       setCards([]);
//       setError("Failed to load study cards.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCards();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [deckId]);

//   const toggleAnswer = (index) => {
//     setShownAnswers((previous) => ({
//       ...previous,
//       [index]: !previous[index],
//     }));
//   };

//   const completeStudySession = async () => {
//     if (!deckId) {
//       setCompleted(true);
//       return;
//     }

//     try {
//       const user = JSON.parse(
//         localStorage.getItem("user") || "{}"
//       );

//       const userId = user?.id || 10;

//       await api.post("/study/complete", {
//         userId: userId,
//         deckId: Number(deckId),
//         score: 100,
//       });

//       setCompleted(true);
//     } catch (err) {
//       console.error("Failed to complete study session:", err);

//       // Keep UI working even if backend session saving fails.
//       setCompleted(true);
//       setError(
//         "Study completed, but session could not be saved."
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           <p>Loading study cards...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && cards.length === 0) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           <h1>Study Mode</h1>

//           <p>{error}</p>

//           <button
//             type="button"
//             className="primary-button"
//             onClick={loadCards}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (completed) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           <h1>Study Completed</h1>

//           <p>
//             You have completed all the flashcards in this deck.
//           </p>

//           {error && (
//             <p className="error-message">
//               {error}
//             </p>
//           )}

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

//   if (cards.length === 0) {
//     return (
//       <div className="study-page">
//         <div className="study-card">
//           <h1>Study Mode</h1>

//           <p>
//             No flashcards are available for this deck.
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

//   return (
//     <div className="study-page">
//       <div className="study-list">

//         {cards.map((card, index) => {
//           const question =
//             card?.frontContent ||
//             card?.frontText ||
//             card?.front ||
//             card?.question ||
//             card?.source ||
//             "";

//           const answer =
//             card?.backContent ||
//             card?.backText ||
//             card?.back ||
//             card?.answer ||
//             card?.translation ||
//             "";

//           return (
//             <div
//               className="study-card multi-study-card"
//               key={card?.id || index}
//             >
//               <div className="study-question-number">
//                 Question {index + 1} of {cards.length}
//               </div>

//               <div className="question-section">
//                 <p className="question-text">
//                   {question}
//                 </p>

//                 {shownAnswers[index] && (
//                   <div className="answer">
//                     <strong>Answer</strong>

//                     <p>
//                       {answer}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="study-actions">
//                 {!shownAnswers[index] ? (
//                   <button
//                     type="button"
//                     className="primary-button"
//                     onClick={() => toggleAnswer(index)}
//                   >
//                     Show Answer
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     className="primary-button"
//                     onClick={() => toggleAnswer(index)}
//                   >
//                     Hide Answer
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}

//         <div className="study-bottom-actions">
//           <button
//             type="button"
//             className="primary-button"
//             onClick={completeStudySession}
//           >
//             Finish Study
//           </button>

//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             Back to Decks
//           </Link>
//         </div>

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

  const allCards =
    searchParams.get("all") === "true";

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
      let result = [];

      // --------------------------------
      // 1. SPECIFIC DECK STUDY
      // --------------------------------
      if (deckId) {
        const response =
          await api.get(
            `/flashcards/deck/${deckId}`
          );

        const data =
          response?.data;

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
      }

      // --------------------------------
      // 2. DASHBOARD STUDY
      // LOAD ALL CARDS FROM ALL DECKS
      // --------------------------------
      else if (allCards) {
        const decksResponse =
          await api.get("/decks");

        const decksData =
          Array.isArray(
            decksResponse?.data
          )
            ? decksResponse.data
            : decksResponse?.data?.decks ||
              [];

        const cardsFromAllDecks =
          await Promise.all(
            decksData
              .filter(
                (deck) => deck?.id
              )
              .map(async (deck) => {
                try {
                  const response =
                    await api.get(
                      `/flashcards/deck/${deck.id}`
                    );

                  const data =
                    response?.data;

                  if (
                    Array.isArray(data)
                  ) {
                    return data;
                  }

                  if (
                    Array.isArray(
                      data?.cards
                    )
                  ) {
                    return data.cards;
                  }

                  if (
                    Array.isArray(
                      data?.flashcards
                    )
                  ) {
                    return data.flashcards;
                  }

                  if (
                    Array.isArray(
                      data?.items
                    )
                  ) {
                    return data.items;
                  }

                  return [];
                } catch (err) {
                  console.error(
                    `Failed to load cards for deck ${deck.id}:`,
                    err
                  );

                  return [];
                }
              })
          );

        result =
          cardsFromAllDecks.flat();
      }

      // --------------------------------
      // 3. EXISTING DUE-CARD FLOW
      // --------------------------------
      else {
        const userId = 10;

        const response =
          await api.get(
            `/study/due?userId=${userId}`
          );

        const data =
          response?.data;

        if (Array.isArray(data)) {
          result = data;
        } else if (
          Array.isArray(data?.cards)
        ) {
          result = data.cards;
        } else if (
          Array.isArray(
            data?.flashcards
          )
        ) {
          result = data.flashcards;
        } else if (
          Array.isArray(data?.items)
        ) {
          result = data.items;
        }
      }

      // --------------------------------
      // HANDLE NESTED CARD RESPONSES
      // --------------------------------
      result = result.map(
        (item) =>
          item?.card
            ? item.card
            : item
      );

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

    // Reload when study mode changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, allCards]);

  const currentCard =
    cards[currentIndex];

  // --------------------------------
  // COMPLETE STUDY SESSION
  // --------------------------------
  const completeStudySession =
    async () => {

      /*
       * Dashboard all-card study does not
       * have a specific deck ID.
       *
       * Therefore we simply complete the
       * frontend study session here.
       */
      if (!deckId) {
        setSessionCompleted(true);
        return;
      }

      try {
        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) || "{}"
          );

        const userId =
          user?.id || 10;

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
  if (
    error &&
    !cards.length
  ) {
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
            flashcards in this study session.
          </p>

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
            No flashcards are available.
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