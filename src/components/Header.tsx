import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContextObj } from "../contexts/LoginContext";

function Header() {
  const { loginStatus, userLogout } = useContext(LoginContextObj);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await userLogout();
    navigate("/login");
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "15px",
          padding: "10px",
          background: "#f0f0f0",
        }}
      >
        <NavLink to="/dashboard">Dashboard</NavLink>

        {loginStatus ? (
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}

        <NavLink to="/register">Register</NavLink>
      </nav>
    </div>
  );
}

export default Header;