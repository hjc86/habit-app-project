import React from "react";
import Button from 'react-bootstrap/Button'
import EditModal from './EditModal'

class Habits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            modalShow : false
        }
    }

    handleClickDelete = (event) =>{
        event.preventDefault();
        const url = 'http://localhost:3001/habits';
        fetch(url, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id})
        })
        .then( this.props.updateState())
    }
    
    handleClickUpdate = (event) =>{
        event.preventDefault();
        console.log(event.target);
        const url = 'http://localhost:3001/habits';
        fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id})
        })        
        .then(this.props.updateState())

    }

    handleClickComplete = (event) =>{
        event.preventDefault();
        console.log(event.target);
        let completed;
        let currentStreak = this.props.data.streak;
        console.log(currentStreak);
        console.log(this.props.data);
        let time = new Date().getTime() / 1000;
        console.log(time);
        console.log(this.props.data.start_date);
        (time > this.props.data.start_date && time < this.props.data.end_date) ? currentStreak++ : currentStreak += 0;
        this.props.data.completed ? completed = 0 : completed = 1;
        const url = 'http://localhost:3001/habits';
        fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id, completed: completed, streak: currentStreak})
        })        
        .then(this.props.updateState());





    }

    render () {
        
        return (
            <div className="habit-box">
                
                {/* <h2>{this.props.data.user_id}</h2> */}
                <h2>{this.props.data.habit_name}</h2>
                <h2>{this.props.data.id}</h2>
                <h2>{this.props.data.completed}</h2>
                <Button onClick={this.handleClickDelete}>Delete</Button>
                <Button onClick={this.handleClickComplete}>Complete</Button>
                <Button onClick={() => this.setState({ modalShow: true })}> Update!</Button>

                <EditModal
                show={this.state.modalShow}
                onHide={() => this.setState({modalShow : false})}
                user_id = {this.props.userID}
                updateState = {this.props.updateState}
                data = {this.props.data}
                />
                
            </div>

        )
    }
}




export default Habits;