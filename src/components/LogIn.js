import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../css/LogIn.css'
import AlertMessage from './Alert'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            userID: null,
            alertShow: false,
            message: null,
            variant: null
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
        const url = 'http://localhost:3001/users';
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
        .then(response => response.json())
        .then(data =>{

            if(data.errorMessage){
                console.log(data.errorMessage);
                this.setState({
                    message: data.errorMessage,
                    variant: "danger"
                })
                this.toggleAlertShow();
            } else if(data.successMessage){
                console.log(data.successMessage)
                this.setState({
                    message: data.successMessage,
                    variant: "success"
                })
                this.toggleAlertShow();
            } else if(data.defaultError){
                console.log(data.defaultError)
                this.toggleAlertShow();
            } else {
                console.log(data)
            }
        })
    }

    toggleAlertShow = () =>{
        this.setState({alertShow : true})
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
                this.setState({
                    message: data.message,
                    variant: "danger"
                })
                this.toggleAlertShow();
            }
        });
        
    }

    render(){
        console.log(this.state.alertShow);
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
                <AlertMessage variant={this.state.variant} message={this.state.message} show={this.state.alertShow} toggleShow={this.toggleAlertShow}/>
            </div>    
        )
    }
 }

 export default LogIn;