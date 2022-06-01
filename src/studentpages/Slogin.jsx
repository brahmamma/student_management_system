import React from 'react'
import {Link} from 'react-router-dom'
import {useEffect} from 'react'

function Slogin(){

    const [dummydata,setdummydata]=React.useState([])
    const [originaldata,setoriginaldata]=React.useState([])
    const dummyData = () =>
   {
       fetch('http://localhost:8000/get_dummy')
       .then(res=> res.json())
       .then(data=>{
           console.log(data);
           setdummydata(data)})
   }
   const originalData = () =>
   {
       fetch('http://localhost:8000/get_original')
       .then(res=> res.json())
       .then(data=>{console.log(data);
        setoriginaldata(data)})
   }
   useEffect(() => {
    dummyData();
    originalData();
 },[])


    const [user, setuser] = React.useState({
        username:'',
        password:''
      });

    
    function handleReg(){
        window.location.href='/stu-register'
    }
    function handleLog(){
        var foundoriginal=false;
        var founddummy=false;
        if(dummydata&&originaldata){
            if(user.username==''||user.password==''){
                alert("provide credentials")
                window.location.reload()
            }
            else{

                if(true){
                    originaldata.map((stu)=>{
                        if(stu.username===user.username){
                            console.log("inside if in map")
                            if(stu.password===user.password){
                                foundoriginal=true
                                alert("Logged in successful");
                                window.localStorage.setItem("loggedinuser",JSON.stringify(stu))
                                window.location.href='/logsuccessstudent'
                            }
        
                        }
                        
        
                    })
                }
                if(foundoriginal==false){
                    console.log("dummy")
                    dummydata.map((stu)=>{
                        if(stu.username==user.username){
                            if(stu.password==user.password){
                                founddummy=true
                                alert("Your registration is not yet approved please wait");
                                window.location.reload();
                            }
        
                        }
                        
        
                    })
    
                }
                console.log("out of map")
                if(foundoriginal==false&&founddummy==false){
                    alert("Please register to login")
                    window.location.href='/stu-register'
                }
    
            }
        }
        
        

    }
    return (
        <div>
            <div>
              <Link to='/'>Home</Link>  
            </div>
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="username" value={user.username} placeholder="Username" onChange={(e)=>{setuser({...user,username:e.target.value})}} ></input>
            <input type="password" name="password" value={user.password} placeholder="Password"  onChange={(e)=>{setuser({...user,password:e.target.value})}}></input>
            <div className="button" onClick={handleLog}>Login</div>
            <div>or</div>
            <div className="button" onClick={handleReg}>Register</div>
            
        </div>
        </div>
    )
}

export default Slogin