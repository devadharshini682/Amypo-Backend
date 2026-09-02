// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cards: [],
//   currentIndex: 0,
//   score: 0,
//   sessionId: null,
//   sessionStatus: "ACTIVE",
//   loading: false,
//   error: null,
// };

// const studySlice = createSlice({
//   name: "study",

//   initialState,

//   reducers: {
//     setCards: (state, action) => {
//       state.cards = action.payload;
//       state.currentIndex = 0;
//     },

//     nextCard: (state) => {
//       if (state.currentIndex < state.cards.length - 1) {
//         state.currentIndex += 1;
//       }
//     },

//     setCurrentIndex: (state, action) => {
//       state.currentIndex = action.payload;
//     },

//     increaseScore: (state) => {
//       state.score += 1;
//     },

//     setScore: (state, action) => {
//       state.score = action.payload;
//     },

//     setSessionId: (state, action) => {
//       state.sessionId = action.payload;
//     },

//     setSessionStatus: (state, action) => {
//       state.sessionStatus = action.payload;
//     },

//     setStudyLoading: (state, action) => {
//       state.loading = action.payload;
//     },

//     setStudyError: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },

//     resetStudy: () => initialState,
//   },
// });

// export const {
//   setCards,
//   nextCard,
//   setCurrentIndex,
//   increaseScore,
//   setScore,
//   setSessionId,
//   setSessionStatus,
//   setStudyLoading,
//   setStudyError,
//   resetStudy,
// } = studySlice.actions;

// export default studySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    decks: [],
    cards: [],
    currentCardIndex: 0,
    score: 0,
    loading: false,
};

const studySlice = createSlice({
    name: "study",

    initialState,

    reducers: {
        setDecks: (state, action) => {
            state.decks = action.payload;
        },

        setCards: (state, action) => {
            state.cards = action.payload;
            state.currentCardIndex = 0;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        increaseScore: (state) => {
            state.score += 1;
        },

        nextCard: (state) => {
            if (state.currentCardIndex < state.cards.length - 1) {
                state.currentCardIndex += 1;
            }
        },

        resetStudy: (state) => {
            state.cards = [];
            state.currentCardIndex = 0;
            state.score = 0;
        },
    },
});

export const {
    setDecks,
    setCards,
    setLoading,
    increaseScore,
    nextCard,
    resetStudy,
} = studySlice.actions;

export default studySlice.reducer;