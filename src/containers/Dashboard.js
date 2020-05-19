import React from 'react';
import HabitModal from '../components/HabitModal'
import AccountModal from '../components/AccountModal'
import Button from 'react-bootstrap/Button'
import Habits from '../components/Habits'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../css/Dashboard.css'



class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalShow : false,
      accountModalShow : false,
      data: null,
      count: 0
    }
  }

  updateState = () => {
    this.displayHabits();
  }

  handleClickLogout = () =>{
    this.props.setID(null);
  }

  handleClickAccount = async (event) =>{
    event.preventDefault();
    //     console.log(event.target);
    //     const url = 'http://localhost:3001/users';
    //     const response = await fetch(url, {
    //         method: 'put',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({id: this.props.userID, username: this.state.username, password: this.state.password})
    //     })

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

  componentDidMount() {
    this.displayHabits();
  }


    // const [modalShow, setModalShow] = React.useState(false);

    render(){
      console.log(this.state.count);
      return this.state.data == null ? 'Loading...' : (
          
        <div>
          <Navbar id="navbar" bg="dark" variant="dark">
            <Nav>
            <Button onClick={this.handleClickAccount}>Account</Button>
            <Button onClick={this.handleClickLogout}>Logout</Button>
            </Nav>
          </Navbar>
          
          <Button variant="primary" onClick={() => this.setState({ modalShow: true })}> Create new habit!</Button>
          
    
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
            updateState = {this.updateState}
            setID = {this.props.setID}
          />

          <div className="habits-container">
            {this.state.data.map(data => <Habits data = {data} updateState = {this.updateState} />)}
          </div>
        </div>
      );
    }
}

  export default Dashboard;