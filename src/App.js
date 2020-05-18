import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import LogIn from "./components/LogIn";
import Habits from "./components/Habits";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: null
    }
  }




  render() {
    return (
      <div className="App">
        <p> Hello World!</p>
        <BrowserRouter>
          <Switch>
            <Route path="/LogIn" component={LogIn}/>
            <Route path ="/Habits" component={Habits}/>
            <Redirect from="/" to="/LogIn"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
