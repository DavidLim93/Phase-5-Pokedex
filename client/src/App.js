import React, {useState, useEffect} from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Scores from "./Components/Scores";
import {Switch, Route} from "react-router-dom";
import './App.css'

function App() {


  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }



 
  return (
    
    <div className="App">
      <h1> Memory Card Game</h1>
      <Navbar setUser={setUser}/>
      {user && <h3>Welcome {user.username}</h3>}
      <Switch>
        <Route exact path="/">
          <Home user={user}/>  
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        {/* <Route path="/scores">
          <Scores />
        </Route> */}
        <Route path="/login">
          <Login onLogin={handleLogin}/>
        </Route>
      </Switch>
      {/* {
          console.log(user)
      } */}
      
    </div>
    
  )
}

export default App;