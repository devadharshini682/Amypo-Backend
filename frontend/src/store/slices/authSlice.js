// import { createSlice } from "@reduxjs/toolkit";

// const savedUser = localStorage.getItem("user");
// const savedToken = localStorage.getItem("token");

// const initialState = {
//   user: savedUser ? JSON.parse(savedUser) : null,
//   token: savedToken || null,
//   isAuthenticated: !!savedToken,
// };

// const authSlice = createSlice({
//   name: "auth",

//   initialState,

//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;

//       localStorage.setItem(
//         "user",
//         JSON.stringify(action.payload.user)
//       );

//       localStorage.setItem("token", action.payload.token);
//     },

//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;

//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     },

//     setUser: (state, action) => {
//       state.user = action.payload;

//       localStorage.setItem(
//         "user",
//         JSON.stringify(action.payload)
//       );
//     },
//   },
// });

// export const {
//   loginSuccess,
//   logout,
//   setUser,
// } = authSlice.actions;

// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            localStorage.setItem("token", action.payload.token);
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem("token");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;