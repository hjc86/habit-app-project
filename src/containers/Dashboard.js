import React from 'react';
import Modal from '../components/Modal'
import Button from 'react-bootstrap/Button'
import Habits from '../components/Habits'



class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalShow : false,
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

  displayHabits = async () => {
    const url = `http://localhost:3001/allHabits/${this.props.userID}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({data: data});
  }

  componentDidMount() {
    this.displayHabits();
  }

  componentDidUpdate() {
   
  }

    // const [modalShow, setModalShow] = React.useState(false);

    render(){
      console.log(this.state.count);
      return this.state.data == null ? 'Loading...' : (
          
        <div>
          <Button variant="primary" onClick={() => this.setState({ modalShow: true })}> Create new habit!</Button>
          <Button onClick={this.handleClickLogout}>Logout</Button>
    
          <Modal
            show={this.state.modalShow}
            onHide={() => this.setState({modalShow : false})}
            user_id = {this.props.userID}
            updateState = {this.updateState}
          />
          <div className="habits-container">
            {this.state.data.map(data => <Habits data = {data} updateState = {this.updateState} />)}
          </div>



        </div>
      );
    }
}

  export default Dashboard;