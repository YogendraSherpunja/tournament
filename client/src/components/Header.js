import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getUser, logout } from "../services/auth";

export default function Header(props) {
  const [username, setUsername] = useState("Username");

  const url = props.url;

  useEffect(() => {
    const user = getUser();
    setUsername(user.username);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <header className="bg-dark mb-4 sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-sm navbar-dark">
          <a href="/" className="navbar-brand">
            Tournament Manager
          </a>
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item pr-2">
              <Link to={`${url}`} className="btn btn-dark">
                Home
              </Link>
            </li>

            <li className="navbar-item pr-2">
              <Link to={`${url}/new`} className="btn btn-dark">
                Add New
              </Link>
            </li>

            <li className="navbar-item pr-2">
              <div class="dropdown">
                <div
                  className="btn btn-dark dropdown-toggle"
                  id="user-menu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {username}
                </div>
                <div class="dropdown-menu" aria-labelledby="user-menu">
                  <button
                    class="dropdown-item"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
