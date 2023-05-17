import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const errors = "Invalid username or password"

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => 
        onLogin(user),
        // alert(`Welcome ${username}`)
        )
      } else {
        alert("Incorrect username or password")
      }
    });
  }

  

  return (
    <form onSubmit={handleSubmit} className="form">
      
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          className="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br></br>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          className="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         <br></br>
        <button type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
     
    </form>
  );
}

export default Login;