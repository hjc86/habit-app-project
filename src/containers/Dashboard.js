import React from 'react';
import MyVerticallyCenteredModal from '../components/Modal'
import Button from 'react-bootstrap/Button'



function Modals(props) {
    const [modalShow, setModalShow] = React.useState(false);
  console.log(props);
    return (
        
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}> Create new habit!</Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          user_id = {props.userID}
        />
      </>
    );
  }

  export default Modals;