import React from "react";
import {Router, Redirect } from "react-router-dom";
import Habits from "./Habits"; 

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            userID: null
        }
        
    }
    
    handleChangeUsername = (e) => {
        let username = e.target.value;
        this.setState({ username: username })
    }
    handleChangePassword = (e) => {
        let password = e.target.value;
        this.setState({ password: password })
    }

    handleClickCreate = async (event) => {
        event.preventDefault();
        console.log(event.target);
        const url = 'http://localhost:3001/users';
        const response = await fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
    }

    
    handleClickLogIn = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:3001/login';
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
        .then(response => response.json())
        .then(data => {
            if (typeof data === 'number') {
                this.setState({userID: data});
                this.props.setID(this.state.userID);
            } else{ 
                console.log(data.message)
            }
        });
        
        //this.props.setID(newID)
        //from app.js
    }

    render(){
        return (
            <div>
                <form autocomplete = 'off'>
                    <label>Username</label>
                    <input onChange={this.handleChangeUsername} type="text" id="username" name="username" required/> 
                    <label>Password</label>
                    <input onChange={this.handleChangePassword} type="text" id="password" name="password" required /> 
                    <button type="submit" onClick={this.handleClickLogIn}>Login</button> 
                    <button type="submit" onClick={this.handleClickCreate}>Create Account</button> 
                </form>
            </div>    
        )
    }
 }

 export default LogIn;