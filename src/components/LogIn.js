import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../css/LogIn.css'

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
                // sessionStorage.setItem('userID', data); ///////////////////////////////Session stuff
                // console.log("Session storage login", sessionStorage.getItem('data')); //////////////////////////////////////////////////
                this.setState({userID: data});
                this.props.setID(this.state.userID);
            } else{ 
                console.log(data.message)
            }
        });
        
    }

    render(){
        return (
            <div className="formDiv">
                <Form className="form" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" placeholder="Enter username" onChange={this.handleChangeUsername}/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Enter password" onChange={this.handleChangePassword}/>
                    <div>
                    <Button type="submit" className="button" onClick={this.handleClickLogIn}>Login</Button> 
                    <Button type="submit" className="button" onClick={this.handleClickCreate}>Create Account</Button> 
                    </div>
                </Form>
            </div>    
        )
    }
 }

 export default LogIn;