
import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
    name: "language",
    initialState: {
        languages: [],
        selectedLanguage: null,
    },
    reducers: {
        setLanguages: (state, action) => {
            state.languages = action.payload;
        },

        setSelectedLanguage: (state, action) => {
            state.selectedLanguage = action.payload;
        },
    },
});

export const {
    setLanguages,
    setSelectedLanguage,
} = languageSlice.actions;

export default languageSlice.reducer;