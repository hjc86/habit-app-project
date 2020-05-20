import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AlertMessage from './Alert';
import '../css/Modal.css'



class HabitModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

handleSubmit = async (e) => {
    e.preventDefault();

    let start_date = new Date(this.state.start_date).getTime() / 1000;
    let end_date = this.state.frequency * 86400 + start_date;

    const url = 'http://localhost:3001/habits';
    fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id: this.props.user_id,
            habit_name: this.state.habit_name,
            current_value: 0,
            target_value: this.state.target_value,
            frequency: this.state.frequency,
            start_date: start_date,
            end_date : end_date,
            streak: 0,
            completed: false
            })
        })
        .then(response => response.json())
        .then(data =>{
            if(data.successMessage){
                this.props.onHide();
                this.props.updateState();
            } else if(data.errorMessage){
                this.setState({message: data.errorMessage, alertShow: true})
            } else {
                console.log(data);
            }
        })
}

render(){
    console.log(this.state)
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create new habit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group as={Row} onChange={this.handleNameChange}>
                    <Form.Label>
                        Habit Name
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter habit name" />
                </Form.Group>  
                <Form.Group as={Row} onChange={this.handleTargetChange}>
                    <Form.Label>
                        Target Value
                    </Form.Label>
                    <Form.Control type="number" placeholder="Enter target value" />
                </Form.Group>  
                <Form.Group as={Row} onChange={this.handleDateChange}>
                    <Form.Label>
                        Start Date
                    </Form.Label>
                    <Form.Control type="date" placeholder="Enter start date" />
                </Form.Group>     
                <Form.Group as={Row} onChange={this.handleFrequencyChange}>
                    <Form.Label>
                        Frequency (days)
                    </Form.Label>
                    <Form.Control type="number" placeholder="Enter frequency" />
                </Form.Group>          

            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant = "secondary" onClick={this.props.onHide}>Close</Button> 
          <Button variant= "primary" onClick={this.handleSubmit}>Submit</Button>
        </Modal.Footer>
        
        <AlertMessage show={this.state.alertShow} variant="danger" message={this.state.message}/>
        
      </Modal>
    );
  }
}


export default HabitModal;