import React from "react";

class Habits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null
        }
    }

     displayHabits = async () => {
        const url = `http://localhost:3001/habits/${this.state.userID}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        

    }

    componentDidMount() {
        
    }

    render () {
        
        return (
            <div>
                <h1>Habits!</h1>
            </div>

        )
    }
}




export default Habits;