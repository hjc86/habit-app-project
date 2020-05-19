import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import LogIn from "./components/LogIn";
import Habits from "./components/Habits";
import Dashboard from './containers/Dashboard';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userID: null
    }
  }

  setID = (loginID) => {
    this.setState({
      userID: loginID
    })
  }

  render() {
    console.log(this.state.userID)


    return this.state.userID !== null ? <Dashboard setID = {this.setID} userID = {this.state.userID}/> : <LogIn setID = {this.setID} />

    
  }
}

export default App;
