import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  languages: [],
  selectedLanguage: null,
  loading: false,
  error: null,
};

const languageSlice = createSlice({
  name: "languages",

  initialState,

  reducers: {
    setLanguages: (state, action) => {
      state.languages = action.payload;
      state.loading = false;
    },

    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },

    setLanguageLoading: (state, action) => {
      state.loading = action.payload;
    },

    setLanguageError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLanguages,
  setSelectedLanguage,
  setLanguageLoading,
  setLanguageError,
} = languageSlice.actions;

export default languageSlice.reducer;