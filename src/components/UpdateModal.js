import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/Modal.css'
import { BsFillTrashFill, BsCheckCircle } from "react-icons/bs";

class UpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            target_value: this.props.data.target_value,
            habit_name: this.props.data.habit_name,
            current_value: this.props.data.current_value,
            completed: this.props.data.completed
        }
    }

    handleCurrentValueChange = (e) => { 
        e.preventDefault();
        let unitDone = parseInt(e.target.value);
        this.setState({unitDone: unitDone});
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await this.setState({ current_value: this.state.current_value + this.state.unitDone })
        await this.state.current_value / this.props.data.target_value >= 1 ? this.setState({completed: 1}) : this.setState({completed: 0});
        
        console.log("This should be updateModal target value = ", this.state.target_value);
        const url = 'http://localhost:3001/habits';
        await fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.data.id,
                habit_name: this.state.habit_name,
                target_value: this.state.target_value,
                current_value: this.state.current_value,
                completed: this.state.completed
            })
        })

        await this.setState({unitDone: 0});
        await this.props.updateState();
        console.log("check that completed value is 1 here ==> ", this.state.completed)
        await this.whenCompleteOrUpdate();
        this.props.onHide();
    }

    whenCompleteOrUpdate = async () => {
        console.log("whencompletoripdate() has been triggered complete should be ", this.state.completed)

        let currentTime = new Date().getTime() / 1000;
        let currentStreak = this.props.data.streak;
        
        (currentTime > this.props.data.start_date && currentTime < this.props.data.end_date && this.state.completed === 1) ?  // if current time is later then start date && current time is before end date then
        currentStreak++ : currentStreak = this.props.data.currentStreak;

        if( this.state.completed === 1){
            let start_date = this.props.data.end_date;
            let end_date = this.props.data.frequency * 86400 + start_date;

            const url = 'http://localhost:3001/habits';
            const response = await fetch(url, {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: this.props.data.id, start_date: start_date, end_date: end_date, streak: currentStreak, habit_name: this.props.data.habit_name, target_value: this.props.data.target_value})
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
            
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="modal-body"> 
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Update habit
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>      
                    <Form.Group as={Row} onChange={this.handleCurrentValueChange}>
                        <Form.Label>
                            Add to your current progress ({this.props.data.current_value} / {this.props.data.target_value})
                        </Form.Label>
                        <Form.Control defaultValue={0} type="number" />
                    </Form.Group>  
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant= "primary" onClick={this.handleSubmit}>Submit <BsCheckCircle/></Button>
            </Modal.Footer>
            </div>
        </Modal>
        );
    }
}
  
  
  
  

export default UpdateModal;