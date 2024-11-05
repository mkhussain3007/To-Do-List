import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useSelector} from 'react-redux'
function UserProfile(){
    let {userObj}=useSelector(state=>state.user);
    return(
        <Card style={{ width: '18rem' }} className="mx-auto mt-5">
        <Card.Img variant="top" src={userObj.profileImg} />
        <Card.Body>
          <Card.Title>{userObj.username}</Card.Title>
          <Card.Text>
            {userObj.email}
          </Card.Text>
          <Card.Text>
            {userObj.city}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    )
}
export default UserProfile