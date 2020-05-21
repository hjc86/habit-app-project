import React from 'react';
import './css/App.css';
import LogIn from "./components/LogIn";
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
    
    return this.state.userID !== null ? 
    <div className="App"><Dashboard setID = {this.setID} userID = {this.state.userID}/></div> 
    : 
    <div className="App"><LogIn setID = {this.setID} /></div>

    
  }
}

export default App;
