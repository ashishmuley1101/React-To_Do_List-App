import React from "react";
import { BrowserRouter as Router, Switch,Route} from "react-router-dom";
import './App.css';
import Home from "./components/home"

function App() {
  return (
    <div className="App" >
     {/* <Headers/> */}
      <Router>
          <Switch>
          <Route exact path="/"><Home/></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;