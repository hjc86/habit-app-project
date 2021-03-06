import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/Modal.css';
import AlertMessage from './Alert'
import { BsFillTrashFill, BsCheckCircle } from "react-icons/bs";

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            habit_name: this.props.data.habit_name,
            target_value: this.props.data.target_value,
            frequency: this.props.data.frequency,
            message: null,
            alertShow: false
        }
    }

handleNameChange = (e) => {
    let habit_name = e.target.value;
    this.setState({ habit_name: habit_name })
}

handleTargetChange = (e) => {
    let target_value = e.target.value;
    this.setState({ target_value: target_value })
}

handleDateChange = (e) => {
    let start_date = e.target.value;
    this.setState({ start_date: start_date })
}

handleFrequencyChange = (e) => {
    let frequency = e.target.value;
    this.setState({ frequency: frequency })
}

handleClickDelete = async (event) =>{
    event.preventDefault();
    let confirm1 = window.confirm("Are you sure you want to do this? This cannot be undone.");
    if(confirm1){
    const url = 'http://localhost:3001/habits';
    const response = await fetch(url, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: this.props.data.id})
    })
    this.props.updateState();
    this.props.onHide();
    }
}

handleSubmit = (e) => {
    this.setState({alertShow: false});
    e.preventDefault();

    const url = 'http://localhost:3001/habits';
    fetch(url, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.props.data.id,
            habit_name: this.state.habit_name,
            target_value: this.state.target_value
            })
        })
        .then(response => response.json())
        .then(data =>{
            if(data.successMessage){
                this.setState({alertShow: false});
                this.props.onHide();
                this.props.updateState();
            }
            else if(data.errorMessage){
                this.setState({message: data.errorMessage, alertShow: true})
            }
            else{
                console.log(data);
            }
        })
}

render(){
    console.log(this.state)
    console.log(this.state.habit_name)
    return (
      <Modal
        {...this.props}
        
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <div className="modal-body">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit {this.props.data.habit_name} details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group as={Row} onChange={this.handleNameChange} >
                    <Form.Label>
                        Habit Name
                    </Form.Label>
                    <Form.Control type="text" defaultValue={this.props.data.habit_name}/>
                </Form.Group>  
                <Form.Group as={Row} onChange={this.handleTargetChange}>
                    <Form.Label>
                        Target Value
                    </Form.Label>
                    <Form.Control type="number" defaultValue={this.props.data.target_value} />
                </Form.Group>  
                {/* <Form.Group as={Row} onChange={this.handleFrequencyChange}>
                    <Form.Label>
                        Frequency (days)
                    </Form.Label>
                    <Form.Control type="number" defaultValue={this.props.data.frequency} />
                </Form.Group>           */}



            </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant = "secondary" onClick={this.props.onHide}>Close</Button>  */}
          <Button variant= "primary" onClick={this.handleSubmit}>Submit <BsCheckCircle/></Button>
          <Button variant = "danger" onClick={this.handleClickDelete}>Delete <BsFillTrashFill/></Button>

        </Modal.Footer>
        </div>
        <AlertMessage show={this.state.alertShow} variant="danger" message={this.state.message}/>
      </Modal>
    );
  }
}
  
  
  
  

export default EditModal;