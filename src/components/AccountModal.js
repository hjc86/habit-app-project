import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/Modal.css'

class AccountModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: null,
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
    const response = await fetch(url, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.props.user_id,
            username: this.state.username,
            password: this.state.password
            })
        })
    this.props.onHide();
    this.props.updateAccState();
}

handleClickDelete = async (event) =>{
    let confirm1 = window.confirm("Are you sure you want to do this? This cannot be undone.");
    if(confirm1){
        let confirm2 = prompt("To delete your account, please enter 'danger zone' into the text box below.")
        if(confirm2==='danger zone'){
          event.preventDefault();
          const url = 'http://localhost:3001/users';
          const response = await fetch(url, {
              method: 'delete',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({id: this.props.user_id})
          })
          this.props.setID(null);
          this.props.updateAccState();       
        }
    }  
}

// getAccountDetails = async () =>{
//     const url = `http://localhost:3001/users/${this.props.user_id}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     this.setState({data: data});
//     console.log(data);
// }

componentDidMount() {
    console.log('componentDidMount fired');
    // this.getAccountDetails();
}


render(){

    console.log(this.state)


    return this.props.username == null ? 'Loading...' : (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
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
                    {/* <Form.Control type="text" /> */}
                    {/* <Form.Control type="text" defaultValue={this.state.data.username} /> */}
                    <Form.Control type="text" defaultValue={this.props.username} />
                </Form.Group>  
                <Form.Group as={Row} onChange={this.handlePasswordChange}>
                    <Form.Label>
                        Password
                    </Form.Label>
                    {/* <Form.Control type="text" placeholder={"password"} /> */}
                    {/* <Form.Control type="text" defaultValue={this.state.data.password} /> */}
                    <Form.Control type="text" defaultValue={this.props.password} />
                </Form.Group>         
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant = "secondary" onClick={this.props.onHide}>Close</Button> 
          <Button variant= "primary" onClick={this.handleSubmit}>Save Changes</Button>
          <Button variant = "danger" onClick={this.handleClickDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
  
export default AccountModal;