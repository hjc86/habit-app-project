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
                this.setState({
                    message: data.errorMessage,
                    variant: "danger"
                })
                this.toggleAlertShow();
            } else if(data.successMessage){
                this.setState({
                    message: data.successMessage,
                    variant: "success"
                })
                this.toggleAlertShow();
            } else if(data.defaultError){
                this.toggleAlertShow();
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
                this.setState({
                    message: data.errorMessage,
                    variant: "danger"
                })
                this.toggleAlertShow();
            }
        });
        
    }

    render(){
        return (
            <div className="login-container">
                <h1 className="title">
                     HabitCheck
                    </h1>
                    <div className="formDiv">
                        <Form className="form" >
                            <Form.Control required className="input" type="text" placeholder="Enter username" onChange={this.handleChangeUsername}/>
                            <Form.Control required  className="input" type="password" placeholder="Enter password" onChange={this.handleChangePassword}/>
                            <div className="button-container">
                            <Button variant="primary" type="submit" id="login-btn" className="button" onClick={this.handleClickLogIn}>Login</Button> 
                            <Button variant="light" type="submit" id="create-btn" className="button" onClick={this.handleClickCreate}>Create Account</Button> 
                            </div>
                        </Form>  
                        <AlertMessage className="alert-container" variant={this.state.variant} message={this.state.message} show={this.state.alertShow} toggleShow={this.toggleAlertShow}/>
                    </div> 
            </div>   
        )
    }
 }

 export default LogIn;