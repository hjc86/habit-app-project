import React from "react";
import Button from 'react-bootstrap/Button'
import EditModal from './EditModal'
import UpdateModal from './UpdateModal'
import ProgressBar from 'react-bootstrap/ProgressBar'

class Habits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            updateShow : false,
            completeShow : false,
            editShow: false
        }
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

    // handleClickUpdate = async (event) =>{
    //     event.preventDefault();
    //     console.log(event.target);
    //     const url = 'http://localhost:3001/habits';
    //     const response = await fetch(url, {
    //         method: 'put',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({id: this.props.data.id})
    //     }) 
    //     await this.props.updateState();
    //     await this.whenCompleteOrUpdate();       
        

    // }

    handleClickComplete = async (event) =>{
        console.log("click complete happened, complete =",this.props.data.completed)
        event.preventDefault();
        const url = 'http://localhost:3001/habits';
        fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id, current_value: this.props.data.target_value, completed: 1})
        })        
        await this.props.updateState();
        await this.whenCompleteOrUpdate();
        console.log("props should be update==>",this.props.data.completed, "streak: ", this.props.data.streak);
    }

    convertToDateTime=(unixtimestamp)=>{
            // Unixtimestamp
            // var unixtimestamp = document.getElementById('timestamp').value;
            // Months array
            var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
           
            // Convert timestamp to milliseconds
            var date = new Date(unixtimestamp*1000);
           
            // Year
            var year = date.getFullYear();
           
            // Month
            var month = months_arr[date.getMonth()];
           
            // Day
            var day = date.getDate();
           
            // Hours
            var hours = date.getHours();
           
            // Minutes
            var minutes = "0" + date.getMinutes();
           
            // Seconds
            var seconds = "0" + date.getSeconds();
           
            // Display date time in MM-dd-yyyy h:m:s format
            var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            
            return convdataTime
    }


    render () {
        let currentTime = new Date().getTime() / 1000;
        
        console.log(currentTime);
        const now = parseInt((this.props.data.current_value/this.props.data.target_value)*100);
        //const progressInstance = <ProgressBar now={now} label={`${now}%`} srOnly />;
        return (
            <div className="habit-box">
                
                {/* <h2>{this.props.data.user_id}</h2> */}
                <h2>{this.props.data.habit_name}</h2>
                <h2>Habit ID: {this.props.data.id}</h2>
                <h2>Completed: {this.props.data.completed}</h2>
                <h2>Streak: {this.props.data.streak}</h2>
                <h6> start time:  {this.convertToDateTime(this.props.data.start_date)} </h6>
                <h6> end time: {this.convertToDateTime(this.props.data.end_date)} </h6>

                
                <Button onClick={this.handleClickComplete}>Complete</Button>
                <Button onClick={() => this.setState({ updateShow: true })}> Update</Button>
                <Button onClick={() => this.setState({ editShow: true })}> Edit</Button>
                <ProgressBar striped now={now} label={`${now}%`} srOnly />
                
                
                <EditModal
                    show={this.state.editShow}
                    onHide={() => this.setState({editShow : false})}
                    user_id = {this.props.userID}
                    updateState = {this.props.updateState}
                    data = {this.props.data}
                />

                <UpdateModal
                    show={this.state.updateShow}
                    onHide={() => this.setState({updateShow : false})}
                    user_id = {this.props.userID}
                    updateState = {this.props.updateState}
                    data = {this.props.data}
                />
                
            </div>

        )
    }
}




export default Habits;