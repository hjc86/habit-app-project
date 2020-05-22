import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/Modal.css';
import AlertMessage from './Alert';
import { BsFillTrashFill, BsCheckCircle } from "react-icons/bs";

class AccountModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: null,
          message: null,
          variant: null,
          alertShow: false,
          username: this.props.username,
          password: this.props.password
        }
    }

handleNameChange = (e) => {
    let username = e.target.value;
    this.setState({ username: username })
}

handlePasswordChange = (e) => {
    let password = e.target.value;
    this.setState({ password: password })
}

handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:3001/users';
    fetch(url, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
              id: this.props.user_id,
              username: this.state.username,
              password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data =>{
          if(data.successMessage){
              this.setState({alertShow: false})
              this.props.onHide();
              this.props.updateAccState();

          }
          else if(data.errorMessage){
            this.setState({message: data.errorMessage, alertShow: true})
          } 
          
        })
    
}

handleClickDelete = (event) =>{
    let confirm1 = window.confirm("Are you sure you want to do this? This cannot be undone.");
    if(confirm1){
        let confirm2 = prompt("To delete your account, and all data associated with it, please enter 'danger zone' into the text box below.")
        if(confirm2==='danger zone'){
          event.preventDefault();
          const url = 'http://localhost:3001/users';
          fetch(url, {
              method: 'delete',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({id: this.props.user_id})
          })
          .then(this.props.setID(null))

        }
    }  
}



componentDidMount() {
}


render(){


    return this.props.username == null ? 'Loading...' : (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="modal-body">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit account details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group as={Row} onChange={this.handleNameChange}>
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control type="text" defaultValue={this.props.username} />
                </Form.Group>  
                <Form.Group as={Row} onChange={this.handlePasswordChange}>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="text" defaultValue={this.props.password} />
                </Form.Group>         
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant= "primary" onClick={this.handleSubmit}>Save Changes <BsCheckCircle/></Button>
          <Button variant = "danger" onClick={this.handleClickDelete}>Delete Data <BsFillTrashFill/></Button>
        </Modal.Footer>
        <AlertMessage show={this.state.alertShow} variant="danger" message={this.state.message}/>
        </div>
      </Modal>
    );
  }
}
  
export default AccountModal;