import logo from './logo.svg';
import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container ,Card,Row, Col, Button} from 'react-bootstrap'; 


function App() {
  function handleslogin(){
    window.location.href='/stu-login'
  }
  function handlealogin(){
    window.location.href='/adm-login'
  }
  return (
    <div className="App">
    <h1>Welcome to Course Portal</h1>
    <Container className='cont1'>  
   <Row>  
   

<Card
  style={{width:"25%"}}  
  className="car card1"  
>  
  <Card.Header>Admin</Card.Header>  
  <Card.Body>  
    <Card.Title></Card.Title>  
    <Card.Text>
    <Button onClick={handlealogin}>Login</Button>
    
    </Card.Text>  
  </Card.Body>  
</Card>
<Card
  style={{width:"25%"}}  
  className="car card2"  
>  
  <Card.Header>Student</Card.Header>  
  <Card.Body>  
    <Card.Title></Card.Title>  
    <Card.Text>
    <Button onClick={handleslogin}>Login</Button>
    
    </Card.Text>  
  </Card.Body>  
</Card>    
</Row>  
</Container> 
  </div>
  )
}
export default App;
