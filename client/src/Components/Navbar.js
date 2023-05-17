import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function Navbar({ setUser }) {

    const linkStyles = {
        display: "inline-block",
        width: "100px",
        padding: "12px",
        margin: "0 6px 6px",
        background: "#702963",
        textDecoration: "none",
        color: "white",
        border: "2px solid #fff"
      };

      const [isLoggedIn, setIsLoggedIn] = useState(false)

      function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
            setIsLoggedIn(false)
          }
        });
      }


return (
    <div>
        <ul>
            <NavLink to="/" exact style={linkStyles} isLoggedIn={isLoggedIn}>Home</NavLink>
            <NavLink to="/signup" style={linkStyles}>Sign Up</NavLink>
            {/* <NavLink to="/scores" style={linkStyles}>Scores</NavLink> */}
            <NavLink to="/login" style={linkStyles}>Login</NavLink>
            <NavLink to="/" exact style={linkStyles} onClick={handleLogoutClick}>Logout</NavLink> 
 
        </ul>
    </div>
)}
export default Navbar;