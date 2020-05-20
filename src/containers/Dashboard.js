import React from 'react';
import HabitModal from '../components/HabitModal'
import AccountModal from '../components/AccountModal'
import Button from 'react-bootstrap/Button'
import Habit from '../components/Habit'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../css/Dashboard.css'
import Row from 'react-bootstrap/Row'


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalShow : false,
      accountModalShow : false,
      data: null,
      accountData: null
    }
  }

  updateState = async () => {
    await this.displayHabits();
  }

  handleClickLogout = () =>{
    localStorage.setItem('data', null);
    console.log("local storage", localStorage.getItem('data'));
    this.props.setID(null);
  }

  handleClickAccount = async (event) =>{
    event.preventDefault();
    console.log("HANDLE CLICK ACCOUNT");
    
    if(this.props.userID !== null){
      console.log("Calling account details from handle click")
      this.getAccountDetails();
    }
    
    this.setState({
      accountModalShow : true
    })

  }

  displayHabits = async () => {
    const url = `http://localhost:3001/allHabits/${this.props.userID}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({data: data});
  }

  getAccountDetails = async () =>{
    const url = `http://localhost:3001/users/${this.props.userID}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({accountData: data});
  }

  componentDidMount = async ()=> {
    await this.displayHabits();
  }

  componentWillMount(){
    console.log(this.props.userID)
    if(this.props.userID !== null){
      this.getAccountDetails();
    }
  }

  render(){
    console.log(this.state.accountData);
    return this.state.data == null ? 'Loading...' : (
        
      <div>
        <Navbar id="navbar" bg="dark" variant="dark">
        <Navbar.Brand>
          HabitCheck
        </Navbar.Brand>
          <Nav>
          <Button variant="dark" onClick={this.handleClickAccount}>Account</Button>
          {'    '}
          <Button variant="dark" onClick={this.handleClickLogout}>Logout</Button>
          {'    '}
          <Button className="justify-content-right" variant="info" onClick={() => this.setState({ modalShow: true })}> Create new habit!</Button>
          </Nav>
        </Navbar>
        
  
        <HabitModal
          show={this.state.modalShow}
          onHide={() => this.setState({modalShow : false})}
          user_id = {this.props.userID}
          updateState = {this.updateState}
        />

        <AccountModal
          show={this.state.accountModalShow}
          onHide={() => this.setState({accountModalShow : false})}
          user_id = {this.props.userID}
          updateAccState = {this.getAccountDetails}
          setID = {this.props.setID}
          username = {this.state.accountData.username}
          password = {this.state.accountData.password}
        />

        <div className="habits-container">
          {this.state.data.map(data => <Habit data = {data} updateState = {this.updateState} />)}   {/*send data for a habit as a prop*/}
        </div>
      </div>
    );
  }
}

export default Dashboard;