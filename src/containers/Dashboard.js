import React from 'react';
import MyVerticallyCenteredModal from '../components/Modal'
import Button from 'react-bootstrap/Button'



class Modals extends React.Component {
  constructor(props){
    super(props);
    this.state = {modalShow : false, setModalshow : false
    }
  }

  handleClickLogout = () =>{
    this.props.setID(null);
  }

    // const [modalShow, setModalShow] = React.useState(false);
    render(){
      return (
          
        <>
          <Button variant="primary" onClick={() => this.setState({ setModalShow: true })}> Create new habit!</Button>
          <Button onClick={this.handleClickLogout}>Logout</Button>
    
          <MyVerticallyCenteredModal
            show={this.state.modalShow}
            onHide={() => this.setState( {setModalShow : false} )}
            user_id = {this.props.userID}
          />
        </>
      );
    }
}

  export default Modals;