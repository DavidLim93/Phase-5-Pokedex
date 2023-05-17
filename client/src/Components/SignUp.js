import React, { useState } from "react";

function SignUp({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        alert ("Username taken or passwords do not match")
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
        />
      <br></br>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      <br></br>
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          className="text"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      <br></br>
      
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
     
    </form>
  );
}

export default SignUp;