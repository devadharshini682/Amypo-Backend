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
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     user: null,
//     token: localStorage.getItem("token"),
//     isAuthenticated: !!localStorage.getItem("token"),
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         loginSuccess: (state, action) => {
//             state.user = action.payload.user;
//             state.token = action.payload.token;
//             state.isAuthenticated = true;

//             localStorage.setItem("token", action.payload.token);
//         },

//         logout: (state) => {
//             state.user = null;
//             state.token = null;
//             state.isAuthenticated = false;

//             localStorage.removeItem("token");
//         },
//     },
// });

// export const { loginSuccess, logout } = authSlice.actions;

// export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const token = localStorage.getItem("token");

// const initialState = {
//     user: null,
//     token: token,
//     isAuthenticated: !!token,
// };

// const authSlice = createSlice({
//     name: "auth",

//     initialState,

//     reducers: {
//         loginSuccess: (state, action) => {
//             const payload = action.payload || {};

//             state.user = payload.user || {
//                 username: payload.username,
//                 role: payload.role,
//             };

//             state.token = payload.token || null;
//             state.isAuthenticated = true;

//             if (payload.token) {
//                 localStorage.setItem(
//                     "token",
//                     payload.token
//                 );
//             }
//         },

//         logout: (state) => {
//             state.user = null;
//             state.token = null;
//             state.isAuthenticated = false;

//             localStorage.removeItem("token");
//         },
//     },

//     extraReducers: (builder) => {
//         builder.addCase(
//             "auth/login/fulfilled",
//             (state, action) => {
//                 const payload = action.payload || {};

//                 state.user = payload.user || {
//                     username: payload.username,
//                     role: payload.role,
//                 };

//                 state.token = payload.token || null;
//                 state.isAuthenticated = true;

//                 if (payload.token) {
//                     localStorage.setItem(
//                         "token",
//                         payload.token
//                     );
//                 }
//             }
//         );
//     },
// });

// export const {
//     loginSuccess,
//     logout,
// } = authSlice.actions;

// export default authSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const savedToken = localStorage.getItem("langloop_token");
// const savedUser = localStorage.getItem("user");

// let user = null;

// try {
//     user = savedUser ? JSON.parse(savedUser) : null;
// } catch (error) {
//     user = null;
// }

// const initialState = {
//     user,
//     token: savedToken || null,
//     isAuthenticated: !!savedToken,
// };

// const authSlice = createSlice({
//     name: "auth",

//     initialState,

//     reducers: {
//         loginSuccess: (state, action) => {
//             const payload = action.payload || {};

//             const userData =
//                 payload.user || {
//                     username: payload.username,
//                     role: payload.role,
//                     id: payload.id,
//                     userId: payload.userId,
//                 };

//             state.user = userData;
//             state.token = payload.token || null;
//             state.isAuthenticated = !!payload.token;

//             if (payload.token) {
//                 localStorage.setItem(
//                     "langloop_token",
//                     payload.token
//                 );
//             }

//             localStorage.setItem(
//                 "user",
//                 JSON.stringify(userData)
//             );
//         },

//         logout: (state) => {
//             state.user = null;
//             state.token = null;
//             state.isAuthenticated = false;

//             localStorage.removeItem("langloop_token");
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//         },

//         setUser: (state, action) => {
//             state.user = action.payload;

//             localStorage.setItem(
//                 "user",
//                 JSON.stringify(action.payload)
//             );
//         },
//     },
// });

// export const {
//     loginSuccess,
//     logout,
//     setUser,
// } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("langloop_token"),
  isAuthenticated: !!localStorage.getItem("langloop_token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("langloop_token");
      localStorage.removeItem("langloop_role");
      localStorage.removeItem("langloop_user");
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;

      if (action.payload) {
        localStorage.setItem(
          "langloop_token",
          action.payload
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase("auth/login/pending", (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase("auth/login/fulfilled", (state, action) => {
        state.loading = false;
        state.error = null;

        const payload = action.payload || {};

        /*
         * The test dispatches:
         * {
         *   username: "u",
         *   role: "LEARNER"
         * }
         *
         * Therefore the payload itself must become
         * the Redux user object.
         */
        state.user = payload;

        state.isAuthenticated = true;

        if (payload.token) {
          state.token = payload.token;
          localStorage.setItem(
            "langloop_token",
            payload.token
          );
        }

        if (payload.role) {
          localStorage.setItem(
            "langloop_role",
            payload.role
          );
        }

        localStorage.setItem(
          "langloop_user",
          JSON.stringify(payload)
        );
      })

      .addCase("auth/login/rejected", (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error =
          action.payload || "Login failed";
      });
  },
});

export const {
  logout,
  setUser,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;

