import React from "react";
import Button from 'react-bootstrap/Button'
import UpdateModal from './UpdateModal'
import CompleteModal from './CompleteModal'
import ProgressBar from 'react-bootstrap/ProgressBar'

class Habits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            modalShow : false,
            modalShow1 : false
        }
    }
    
    componentDidMount() {
        // let completed;
        // this.props.data.current_value / this.props.data.target_value > 1 ? completed = 1 : completed = 0;
        // const url = 'http://localhost:3001/habits';
        // const response = await fetch(url, {
        //     method: 'put',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({id: this.props.data.id, completed: completed})
        // })        
        // this.props.updateState();
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
        let currentStreak = this.props.data.streak;
        console.log(currentStreak);
        console.log(this.props.data);
        let time = new Date().getTime() / 1000;
        console.log(time);
        console.log(this.props.data.start_date);
        (time > this.props.data.start_date && time < this.props.data.end_date) ? currentStreak++ : currentStreak = currentStreak;
        this.props.data.completed ? completed = 0 : completed = 1;
        const url = 'http://localhost:3001/habits';
        const response = await fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id, completed: completed, streak: currentStreak})
        })        
        this.props.updateState();





    }

    render () {
        const now = parseInt((this.props.data.current_value/this.props.data.target_value)*100);
        //const progressInstance = <ProgressBar now={now} label={`${now}%`} srOnly />;
        return (
            <div className="habit-box">
                
                {/* <h2>{this.props.data.user_id}</h2> */}
                <h2>{this.props.data.habit_name}</h2>
                <h2>Habit ID: {this.props.data.id}</h2>
                <h2>Completed: {this.props.data.completed}</h2>
                <h2>Streak: {this.props.data.streak}</h2>


                
                <Button onClick={this.handleClickComplete}>Complete</Button>
                <Button onClick={() => this.setState({ modalShow1: true })}> Complete!!</Button>
                <Button onClick={() => this.setState({ modalShow: true })}> Update!</Button>
                <ProgressBar striped now={now} label={`${now}%`} srOnly />
                 <UpdateModal
                show={this.state.modalShow}
                onHide={() => this.setState({modalShow : false})}
                user_id = {this.props.userID}
                updateState = {this.props.updateState}
                data = {this.props.data}
                />

                <CompleteModal
                show={this.state.modalShow1}
                onHide={() => this.setState({modalShow1 : false})}
                user_id = {this.props.userID}
                updateState = {this.props.updateState}
                data = {this.props.data}
                />
                
            </div>

        )
    }
}




export default Habits;