import { set } from 'mongoose';
import React from 'react';
import { useState ,useEffect} from 'react'; 
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';   
 
const Dashboards = () => {
  const user=JSON.parse(window.localStorage.getItem('loggedinuser'))
   const[allcourses,setallcourses] = useState([])
   const[registerdcourses,setregisterdcourses] = useState([])
   const[regcourses,setregcourses] = useState([])
   const[notregcourses,setnotregcourses] = useState([])
   const getData = () =>
   {
       fetch('https://student-management-system-123.herokuapp.com/get_courses')
       .then(res=> res.json())
       .then(data=>setallcourses(data))
   }
   const getRegData = () =>
   {
       fetch('https://student-management-system-123.herokuapp.com/get_regcourses')
       .then(res=> res.json())
       .then(data=>{
         console.log(data)
         setregisterdcourses(data)})
   }
   function Filtering(){
    const tempr=[]
    const tempn=[]
     if(true){
      allcourses&&allcourses.map((ec,i)=>{
      
        var found=false
         if(true){
           registerdcourses&&registerdcourses.map((erc)=>{
             if(ec._id===erc.cid){
               if(erc.uid===user._id){
                 tempr.push(ec)
                   found=true
               }
   
             }
             
   
           })
         }
         if(found===false){
           tempn.push(ec)
         }
 
      }
      )
     }
     if(true){
       setregcourses(tempr);
       setnotregcourses(tempn)
       
     }
   }
 
   useEffect(() => {
      getData();
      getRegData();
      Filtering();
      if(s===0){
        sets(1)
      }
      else{
        sets(0)
      }
   },[s])
   

   var [p,setp]=React.useState(0)
   
     function handleregistercourse(c,u,e){
         var obj={c,u}
         e.target.disabled=true
         e.target.innerText="Waiting..."
         fetch("https://student-management-system-123.herokuapp.com/req_course",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj) 
          })
          .then((res)=>{
            return res.json()
          }).then(data=>{console.log(data)})


     } 
     var [s,sets]=React.useState(0)  
    function handleallcourse(){
      setp(0)
  }
  function handlepayment(){
       
    setp(1)
    
    
}
 
    return (
      <div class="col main pt-5 mt-3">
      <div class="row mb-3">
      <div class="col-xl-3 col-sm-6 py-2" onClick={handleallcourse}>
              <div class="card bg-success text-white h-100">
                  <div class="card-body bg-primary" style={{backgroundColor:"#57b960"}}>
                      
                      <h6 class="text-uppercase">All Courses</h6>
                  </div>
              </div>
          </div>
          <div class="col-xl-3 col-sm-6 py-2" onClick={handlepayment}>
              <div class="card bg-success text-white h-100">
                  <div class="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                      
                      <h6 class="text-uppercase">Do Payment</h6>
                  </div>
              </div>
          </div>
        </div>
    <div id="div1" className={(p==0 && p!=1)?'dis':'hide'}>
      <div>
        <center><h2>Courses you have already registerd</h2></center>
            <Container className='p-4'>  
                <Row>  
                
            { regcourses&& regcourses.map((course,cindex) => (  
            <Card
                
                key={cindex}  
                 
                style={{width:"23%"}}  
                className="m-2 car"  
            >  
                <Card.Header><b><center>{course.coursename}</center></b></Card.Header>  
                <Card.Body> 
                  <center>
                <Card.Title><b>Fees:{course.coursefees}</b></Card.Title>  
                <Card.Text>
                <br/>
                Duration:{course.courseduration}
                <br/>
                <br/>
                Level:{course.courselevel}
                </Card.Text>
                </center> 
                </Card.Body>  
            </Card>  
            ))}  
            </Row>  
            </Container>  
    </div> 



      <hr/>

        <div>
        <center><h2>Courses we are suggesting you to register</h2></center>
            <Container className='p-4'>  
                <Row>  
                
            { notregcourses&& notregcourses.map((course,cindex) => (  
            <Card
                
                key={cindex}  
                 
                style={{width:"23%"}}  
                className="m-2 car"  
            >  
                <Card.Header><b><center>{course.coursename}</center></b></Card.Header>  
                <Card.Body>
                <center>   
                <Card.Title><b>Fees:{course.coursefees}</b></Card.Title>  
                <Card.Text>
                <br/>
                Duration:{course.courseduration}
                <br/>
                <br/>
                Level:{course.courselevel}
                </Card.Text>
                
                <center><Button onClick={(e)=>{handleregistercourse(course,user,e)}}>Register</Button></center>
                </center> 
                </Card.Body>  
            </Card>  
            ))}  
            </Row>  
            </Container>  
    </div> 
        
 
    </div>
    <div id="div2" className={(p==1&&p!==0)?'dis':'hide'}>
         <div className='login'>
         <h2>Add Course here</h2>
        </div>
      </div>  








      
       
     

  </div>
    )
}
 
export default Dashboards