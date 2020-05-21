
import React from "react";
import Button from 'react-bootstrap/Button'
import EditModal from './EditModal'
import UpdateModal from './UpdateModal'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Card from  'react-bootstrap/Card'
import {  FaFire, FaMeteor} from 'react-icons/fa';
import { BsFillBarChartFill, BsCheckBox, BsPencilSquare, BsFillCloudFill } from 'react-icons/bs';
import '../css/Habit.css'
// import WordPOS from 'C:\\Users\\HJC\\Documents\\futureproof_code\\habit-app\\public\\dist\\wordpos.min.js'


import {

        GiBlaster,
    
        GiFragmentedMeteor,
        GiBurningMeteor} from 'react-icons/gi';

import {GrRun,GrEdit}  from "react-icons/gr";
        

import { TiTick, 
} from 'react-icons/ti';
    
import {

        DiMeteor,} from 'react-icons/di';
        
        
        import {

            WiMeteor,} from 'react-icons/wi';




import { IconContext } from "react-icons";
 


class Habits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            updateShow : false,
            completeShow : false,
            editShow: false,
            streak: this.props.data.streak,
            completed: this.props.data.completed
        }
    }

    handleClickComplete = async (event) =>{
        console.log("click complete happened, complete =",this.props.data.completed)
        event.preventDefault();
        const url = 'http://localhost:3001/habits';
        await fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id, current_value: this.props.data.target_value, completed: 1, habit_name: this.props.data.habit_name, target_value: this.props.data.target_value})
        })        
    
        await this.props.updateState();
        console.log("in handle click completed after updateStae claled; val of completed: ", this.props.data.completed)

        await this.whenCompleteOrUpdate();
        await this.setState({current_value: this.props.data.target_value})
        console.log("props should be update==>", this.props.data.completed, "streak: ", this.props.data.streak);
    }

    whenCompleteOrUpdate = async () => {

        let currentTime = new Date().getTime() / 1000;
        let currentStreak = this.props.data.streak;
        
        (currentTime > this.props.data.start_date && currentTime < this.props.data.end_date && this.props.data.completed === 1) ?  // if current time is later then start date && current time is before end date then
        currentStreak++ : currentStreak = this.props.data.streak;

        if( this.props.data.completed === 1){
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
 
        const now = parseInt((this.props.data.current_value/this.props.data.target_value)*100);
        let variant;
        let complete;
        let onFire;

        let calcTimeLeft = () =>{
            let timeLeft = parseInt((this.props.data.end_date - (new Date().getTime() / 1000))/(24*60*60))
            return timeLeft
        } 

        let activityGrammar =()=>{
            let word_array = this.props.data.habit_name.split(" ")
            for (const word of word_array){
                console.log("==>", word)
                if(word.includes("ing")){
                    return word.split("ing")
                }
            }
            return this.props.data.habit_name
        }

        let timeGrammar = "time";
        let unitGrammar = this.props.data.target_value;
        let dayGrammar = "day"
        let frequencyGrammar = "";
        let streak = this.props.data.streak;
        let streakText;

        if(now >=100){
            variant="success"
        }
        else if(now >= 80 ){
            variant="info"
        }
        else{
            variant="info"
        }

        if(this.state.completed==1){
            complete=<TiTick/> 
            
        }

        if(streak>0){
            streakText=`You're currently on a ${streak} day streak! `
            onFire=<FaFire/>
        } else {
            streakText=`Your streak is currently ${streak} `
            onFire=<BsFillCloudFill/>
        }

        if(this.props.data.target_value>1){
            timeGrammar="times"
        }
        else{
            unitGrammar= "once"
            timeGrammar=""
        }

        if(this.props.data.frequency > 1){
            dayGrammar="days"
            frequencyGrammar = this.props.data.frequency
        }

    
    
        

    
        

        return (
            <div className="habit-box">
    

                <h4>{activityGrammar()} at least {unitGrammar} {timeGrammar} every {frequencyGrammar} {dayGrammar}    </h4>
                {/* {complete} */}
                <h5>{streakText}{onFire}</h5> 

                <h5>{calcTimeLeft()} days left to complete your habit!</h5>
                
                
                <div className="habit-buttons">
                
                    <Button  variant="dark" onClick={this.handleClickComplete}><BsCheckBox/></Button>
                    <Button  variant="dark" onClick={() => this.setState({ updateShow: true })}> <BsFillBarChartFill/></Button> 
                    <Button variant="dark" onClick={() => this.setState({ editShow: true })}> <BsPencilSquare/></Button>


                </div>

                <ProgressBar striped now={now} variant={variant} label={`${now}%`}/> 



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
                    current_value = {this.state.current_value}
                />
                
            </div>

        )
    }
}




export default Habits;