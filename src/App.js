import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import LogIn from "./components/LogIn";
import Habits from "./components/Habits";

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
    return (
      <div className="App">
        <h1>Habit Checker</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/LogIn" render={(props) => 
              (<LogIn
                userID={this.userID}
                setID={this.setID}/>
              )}
            />
            <Route path ="/Habits" component={Habits}/>
            <Redirect from="/" to="/LogIn"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
