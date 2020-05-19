import React from "react";
import Button from 'react-bootstrap/Button'

class Habits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null
        }
    }

    handleClickDelete = async (event) =>{
        event.preventDefault();
        const url = 'http://localhost:3001/habits';
        const response = await fetch(url, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id})
        })
        this.props.updateState();
    }
    
    handleClickUpdate = async (event) =>{
        event.preventDefault();
        console.log(event.target);
        const url = 'http://localhost:3001/habits';
        const response = await fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id})
        })        
        this.props.updateState();

    }

    handleClickComplete = async (event) =>{
        event.preventDefault();
        console.log(event.target);
        let completed;
        this.props.data.completed ? completed = 0 : completed = 1;
        const url = 'http://localhost:3001/habits';
        const response = await fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id, completed: completed})
        })        
        this.props.updateState();

    }

    render () {
        
        return (
            <div className="habit-box">
                
                {/* <h2>{this.props.data.user_id}</h2> */}
                <h2>{this.props.data.habit_name}</h2>
                <h2>{this.props.data.id}</h2>
                <h2>{this.props.data.completed}</h2>
                <Button onClick={this.handleClickDelete}>Delete</Button>
                <Button onClick={this.handleClickUpdate}>Update</Button>
                <Button onClick={this.handleClickComplete}>Complete</Button>
            
                
            </div>

        )
    }
}




export default Habits;