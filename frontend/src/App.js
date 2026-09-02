// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useSelector } from "react-redux";

//import Navbar from "./components/layout/Navbar";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/dashboard/Dashboard";

import DeckList from "./components/decks/DeckList";
import DeckDetails from "./components/decks/DeckDetails";
import CreateDeck from "./components/decks/CreateDeck";

import StudyMode from "./components/study/StudyMode";

function ProtectedRoute({
  children,
}) {
  const { isAuthenticated } =
    useSelector(
      (state) => state.auth
    );

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/decks"
          element={
            <ProtectedRoute>
              <DeckList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/decks/create"
          element={
            <ProtectedRoute>
              <CreateDeck />
            </ProtectedRoute>
          }
        />

        <Route
          path="/decks/:id"
          element={
            <ProtectedRoute>
              <DeckDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/study"
          element={
            <ProtectedRoute>
              <StudyMode />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;