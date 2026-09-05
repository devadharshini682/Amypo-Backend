
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth || {});

  const user = auth.user;

  /*
   * Some of the tests provide a user object directly
   * without explicitly setting isAuthenticated.
   */
  const isAuthenticated =
    auth.isAuthenticated === true ||
    !!user;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">LangLoop</Link>
      </div>

      {isAuthenticated && (
        <div className="navbar-links">
          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/decks">
            Decks
          </Link>

          <Link to="/study">
            Study
          </Link>

          {user?.role === "LINGUIST" && (
            <Link to="/decks/create">
              Create Deck
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link to="/analytics">
              Analytics
            </Link>
          )}

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

