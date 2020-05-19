import React from 'react'; 

class Dashboard extends React.Component{

handleClickLogOut = () => {
    this.props.setID(null);
}



render(){
    return (
        <div>
            <h1>Dashboard!</h1>
            <button onClick={this.handleClickLogOut}>Logout</button>
        </div>
    )
}

}


export default Dashboard;