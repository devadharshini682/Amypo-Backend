
// import React from "react";
// import {
//   BrowserRouter,
//   Navigate,
//   Route,
//   Routes,
// } from "react-router-dom";

// import { useSelector } from "react-redux";

// //import Navbar from "./components/layout/Navbar";

// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";

// import Dashboard from "./components/dashboard/Dashboard";

// import DeckList from "./components/decks/DeckList";
// import DeckDetails from "./components/decks/DeckDetails";
// import CreateDeck from "./components/decks/CreateDeck";

// import StudyMode from "./components/study/StudyMode";
// import Navbar from "./components/layout/NavBar";

// function ProtectedRoute({
//   children,
// }) {
//   const { isAuthenticated } =
//     useSelector(
//       (state) => state.auth
//     );

//   if (!isAuthenticated) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//       />
//     );
//   }

//   return children;
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar/>

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Navigate
//               to="/dashboard"
//               replace
//             />
//           }
//         />

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks"
//           element={
//             <ProtectedRoute>
//               <DeckList />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks/create"
//           element={
//             <ProtectedRoute>
//               <CreateDeck />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks/:id"
//           element={
//             <ProtectedRoute>
//               <DeckDetails />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/study"
//           element={
//             <ProtectedRoute>
//               <StudyMode />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/dashboard"
//               replace
//             />
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// import React from "react";
// import {
//   BrowserRouter,
//   Navigate,
//   Route,
//   Routes,
// } from "react-router-dom";
// import { useSelector } from "react-redux";

// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import Dashboard from "./components/dashboard/Dashboard";
// import DeckList from "./components/decks/DeckList";
// import DeckDetails from "./components/decks/DeckDetails";
// import CreateDeck from "./components/decks/CreateDeck";
// import StudyMode from "./components/study/StudyMode";
// import Navbar from "./components/layout/NavBar";


// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }


// function App() {
//   return (
//     <BrowserRouter
//       future={{
//         v7_startTransition: true,
//         v7_relativeSplatPath: true,
//       }}
//     >
//       <Navbar />

//       <Routes>

//         {/* Default route */}
//         <Route
//           path="/"
//           element={<Navigate to="/dashboard" replace />}
//         />

//         {/* Authentication */}
//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Deck List */}
//         <Route
//           path="/decks"
//           element={
//             <ProtectedRoute>
//               <DeckList />
//             </ProtectedRoute>
//           }
//         />

//         {/* Create Deck */}
//         <Route
//           path="/decks/create"
//           element={
//             <ProtectedRoute>
//               <CreateDeck />
//             </ProtectedRoute>
//           }
//         />

//         {/* Deck Details */}
//         <Route
//           path="/decks/:id"
//           element={
//             <ProtectedRoute>
//               <DeckDetails />
//             </ProtectedRoute>
//           }
//         />

//         {/* Study Mode */}
//         <Route
//           path="/study"
//           element={
//             <ProtectedRoute>
//               <StudyMode />
//             </ProtectedRoute>
//           }
//         />

//         {/* Unknown URL */}
//         <Route
//           path="*"
//           element={<Navigate to="/dashboard" replace />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// import React from "react";
// import {
//   BrowserRouter,
//   Navigate,
//   Route,
//   Routes,
// } from "react-router-dom";
// import { useSelector } from "react-redux";

// import "./App.css";

// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import Dashboard from "./components/dashboard/Dashboard";
// import DeckList from "./components/decks/DeckList";
// import DeckDetails from "./components/decks/DeckDetails";
// import CreateDeck from "./components/decks/CreateDeck";
// import StudyMode from "./components/study/StudyMode";
// import Navbar from "./components/layout/NavBar";

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// function App() {
//   return (
//     <BrowserRouter
//       future={{
//         v7_startTransition: true,
//         v7_relativeSplatPath: true,
//       }}
//     >
//       <Navbar />

//       <Routes>
//         <Route
//           path="/"
//           element={<Navigate to="/dashboard" replace />}
//         />

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks"
//           element={
//             <ProtectedRoute>
//               <DeckList />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks/create"
//           element={
//             <ProtectedRoute>
//               <CreateDeck />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks/:id"
//           element={
//             <ProtectedRoute>
//               <DeckDetails />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/study"
//           element={
//             <ProtectedRoute>
//               <StudyMode />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="*"
//           element={<Navigate to="/dashboard" replace />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/dashboard/Dashboard";
import DeckList from "./components/decks/DeckList";
import DeckDetails from "./components/decks/DeckDetails";
import EditDeck from "./components/decks/EditDeck";

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Deck List */}
        <Route
          path="/decks"
          element={
            <ProtectedRoute>
              <DeckList />
            </ProtectedRoute>
          }
        />

        {/* Deck Details */}
        <Route
          path="/decks/:id"
          element={
            <ProtectedRoute>
              <DeckDetails />
            </ProtectedRoute>
          }
        />

        {/* Edit Deck - T16 UPDATE LOGIC */}
        <Route
          path="/decks/:id/edit"
          element={
            <ProtectedRoute>
              <EditDeck />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;