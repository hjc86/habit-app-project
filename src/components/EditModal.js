import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/Modal.css';

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            habit_name: this.props.data.habit_name,
            current_value: this.props.data.current_value,
            completed: this.props.data_completed
        }
    }

handleCurrentChange = (e) => {
    let unitDone = parseInt(e.target.value);
    this.setState({unitDone: unitDone});
}

handleSubmit = (e) => {
    e.preventDefault();
    await this.setState({ current_value: this.state.current_value + this.state.unitDone })
    await this.state.current_value / this.props.data.target_value >= 1 ? this.setState({completed: 1}) :  this.setState({completed: 0});

    const url = 'http://localhost:3001/habits';
    fetch(url, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.props.data.id,
            habit_name: this.state.habit_name,
            current_value: this.state.current_value,
            completed: this.state.completed
            })
        })

    this.props.onHide();
    await this.props.updateState();
    await this.whenCompleteOrUpdate();
}




whenCompleteOrUpdate = async () => {
    console.log("whencompletoripdate() has been triggered complete should be ", this.props.data.completed)

    let currentTime = new Date().getTime() / 1000;
    let currentStreak = this.props.data.streak;
    

    (currentTime > this.props.data.start_date && currentTime < this.props.data.end_date && this.props.data.completed === 1) ?  // if current time is later then start date && current time is before end date then
        currentStreak++ : currentStreak = currentStreak;
        
    if(this.props.data.completed === 1){
        let start_date = this.props.data.end_date;
        let end_date = this.props.data.frequency * 86400 + start_date;
        
        
        const url = 'http://localhost:3001/habits';
        const response = await fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id, start_date: start_date, end_date: end_date, streak: currentStreak})
        })     

        await this.props.updateState();
        console.log("streak has been updated");
    }else {
        console.log("streak hasn't been updated")
    }

}


render(){
    console.log(this.state)
    console.log(this.state.habit_name)
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update habit
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
                <Form.Group as={Row} onChange={this.handleCurrentChange}>
                    <Form.Label>
                        Unit done
                    </Form.Label>
                    <Form.Control type="number" />
                </Form.Group>  
               



            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant = "secondary" onClick={this.props.onHide}>Close</Button> 
          <Button variant= "primary" onClick={this.handleSubmit}>Submit</Button>
          {/* <Button onClick={this.handleClickDelete}>Delete</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}
  
  
  
  

export default EditModal;
