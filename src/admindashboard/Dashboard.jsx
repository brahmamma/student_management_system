import { set } from 'mongoose';
import React from 'react';
import { useState ,useEffect} from 'react'; 
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';   
 
const Dashboard = () => {
   
   const[allcourses,setallcourses] = useState([])
   const[dummyregisters,setdummyregisters] = useState([])
   const[dummycourseregisters,setdummycourseregisters] = useState([])
 
   const getData = () =>
   {
       fetch('https://student-management-system-123.herokuapp.com/get_courses')
       .then(res=> res.json())
       .then(data=>setallcourses(data))
   }
   const getDummyRegisters = () =>
   {
       fetch('https://student-management-system-123.herokuapp.com/get_dummyregisters')
       .then(res=> res.json())
       .then(data=>setdummyregisters(data))
   }
   const getDummyCourseRegisters = () =>
   {
       fetch('https://student-management-system-123.herokuapp.com/get_dummycourseregisters')
       .then(res=> res.json())
       .then(data=>setdummycourseregisters(data))
   }
 
   useEffect(() => {
      getData();
      getDummyRegisters();
      getDummyCourseRegisters();
   },[])





   const [course,setcourse]=useState({
       coursename:'',
       courseduration:'',
       coursefees:null,
       courselevel:''
   })
   
   var [s,sets]=React.useState(0)
   function handleallcourse(){
       sets(0)
   }
    function handleaddcourse(){
       
        sets(1)
        
        
    }
    function handleregisterapprove(){
        
        sets(2)
        
        
    }
    function handlecourseapprove(){
        
        sets(3)
        
    }
    function handlefeeapprove(){
        
        sets(4)
        
    }
    function handledelete(obj){
        fetch(`https://student-management-system-123.herokuapp.com/del_reg_request/${obj._id}`,{
            method:'DELETE',
            header:{
                'Content-Type':'application/json'
            }
        }).then(()=>{window.location.reload()})
        
    }
    function handleapprove(obj){
        fetch('https://student-management-system-123.herokuapp.com/add_registers',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then((data)=>{
            fetch(`https://student-management-system-123.herokuapp.com/del_reg_request/${obj._id}`,{
            method:'DELETE',
            header:{
                'Content-Type':'application/json'
            }
            
        }).then(()=>{sets(0)})
        }
            
     )
    }
     function handleapprovecourse(obj){
        fetch('https://student-management-system-123.herokuapp.com/add_registerdcourses',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then((data)=>{
            fetch(`https://student-management-system-123.herokuapp.com/del_cou_reg_request/${obj._id}`,{
            method:'DELETE',
            header:{
                'Content-Type':'application/json'
            }
            
        }).then(()=>{window.location.reload()})
        }
            
     )

     } 
     function handledeletecourse(obj){
        fetch(`https://student-management-system-123.herokuapp.com/del_cou_reg_request/${obj._id}`,{
            method:'DELETE',
            header:{
                'Content-Type':'application/json'
            }
        })

     } 
    function addcourse(){
        fetch("https://student-management-system-123.herokuapp.com/add_course",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(course) 
        })
        .then((res)=>{
          return res.json()
        })
        .then(data=>{
            if(data.msg==='success'){
                alert("Successfully added")
                setcourse({
                coursename:'',
                courseduration:'',
                coursefees:0,
                courselevel:''
                })
                sets(0)
                getData()
            }
            else{
                alert("got error")
            }
        })
    }
 
    return (
    <div class="col main pt-5 mt-3">
         
        <p class="lead d-none d-sm-block">Take action...</p>
        
        <div class="alert alert-warning fade collapse" role="alert" id="myAlert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
                <span class="sr-only">Close</span>
            </button>
            <strong>Take action...</strong>
        </div>
        <div class="row mb-3">
        <div class="col-xl-3 col-sm-6 py-2" onClick={handleallcourse}>
                <div class="card bg-success text-white h-100">
                    <div class="card-body bg-primary" style={{backgroundColor:"#57b960"}}>
                        
                        <h6 class="text-uppercase">All Courses <span className='spanstyle'>{allcourses.length}</span></h6>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2" onClick={handleaddcourse}>
                <div class="card bg-success text-white h-100">
                    <div class="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                        
                        <h6 class="text-uppercase">Add Course</h6>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2" onClick={handleregisterapprove}>
                <div class="card text-white bg-danger h-100">
                    <div class="card-body bg-danger">
                        
                        <h6 class="text-uppercase" >Registration Approvals<span className='spanstyle'>{dummyregisters.length}</span></h6>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2" onClick={handlecourseapprove}>
                <div class="card text-white bg-info h-100">
                    <div class="card-body bg-info">
                        
                        <h6 class="text-uppercase">Course Approvals<span className='spanstyle'>{dummycourseregisters.length}</span></h6>
                        
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2" onClick={handlefeeapprove}>
                <div class="card text-white bg-warning h-100">
                    <div class="card-body">
                        
                        <h6 class="text-uppercase">Fee Approval</h6>
                        
                    </div>
                </div>
            </div>
        </div>

        <div className={(s==0 && s!=1 && s!=2 && s!=3 && s!=4)?'dis':'hide'}>
            <Container className='p-4'>  
                <Row>  
                
            { allcourses&& allcourses.map((course,cindex) => (  
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
                Duration:{course.courseduration}
                <br/>
                Level:{course.courselevel}
                <br/>
                </Card.Text> 
                </center>   
                </Card.Body>  
            </Card>  
            ))}  
            </Row>  
            </Container>  
    </div> 
        <div id="div1" className={(s==1&&s!=0)?'dis':'hide'}>
         <div className='login'>
         <h2>Add Course here</h2>
        <input type="text" name="coursename" value={course.coursename} onChange={(e)=>{setcourse({...course,coursename:e.target.value})}} placeholder="Coursename"></input><br/>
        <input type="text" name="courseduration"value={course.courseduration} onChange={(e)=>{setcourse({...course,courseduration:e.target.value})}} placeholder="CourseDuration" ></input><br/>
        <input type="number" name="coursefees" value={course.coursefees}onChange={(e)=>{setcourse({...course,coursefees:e.target.value})}} placeholder="coursefees"></input><br/>
        <input type="text" name="courselevel" value={course.courselevel}onChange={(e)=>{setcourse({...course,courselevel:e.target.value})}} placeholder="courselevel" ></input><br/>
            <div className="btn btn-primary" onClick={addcourse}>Add Course</div>
        </div>   
        
        </div>
        <center>
        <div id="div2" className={(s==2 &&s!=0)?'dis':'hide'}>
        <h2>Pending Student Registration Approvals</h2>
        <table className='tablestyle'>
            <tr className='thstyle'>
                <th className='tdstyle'>Username</th>
                <th className='tdstyle'>Email</th>
                <th className='tdstyle'>Action</th>
            </tr>
            
        {dummyregisters&&dummyregisters.map((reg)=>{
            return(
                <tr>
                <td className='tdstyle'>{reg.username}</td>
                <td className='tdstyle'>{reg.email}</td>
                <td className='tdstyle'><button onClick={()=>{handleapprove(reg)}}>Approve</button><button onClick={()=>{handledelete(reg)}}>Delete</button></td>
                </tr>
            )
        })}
        </table>
        </div>
        </center>
        <center>
        <div id="div3" className={(s==3&&s!=0)?'dis':'hide'}>
        <h2>Pending Course Registration Approvals</h2>
        <table className='tablestyle'>
            <tr className='thstyle'>
                <th className='tdstyle'>Username</th>
                <th className='tdstyle'>Course</th>
                <th className='tdstyle'>Fees</th>
                <th className='tdstyle'>Actions</th>
            </tr>
            
        {dummycourseregisters&&dummycourseregisters.map((reg)=>{
            return(
                <tr>
                <td className='tdstyle'>{reg.username}</td>
                <td className='tdstyle'>{reg.coursename}</td>
                <td className='tdstyle'>{reg.coursefee}</td>
                <td className='tdstyle'><button onClick={()=>{handleapprovecourse(reg)}}>Approve</button><button onClick={()=>{handledeletecourse(reg)}}>Delete</button></td>
                </tr>
            )
        })}
        </table>
        </div>
        </center>
        <div id="div3" className={(s==4&&s!=0)?'dis':'hide'}>
        <h2>Div4</h2>
        </div>
 
    </div>
    )
}
 
export default Dashboard