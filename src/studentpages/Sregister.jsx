import React from "react"
import {Link} from 'react-router-dom'
    
const Register = () => {
    const [user, setuser] = React.useState({
        username:'',
        password:'',
        email:''
      });

    function handleRegister(){

        fetch("https://student-manageent-system-123.herokuapp.com/reg_student",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user) 
        })
        .then((res)=>{
          return res.json()
        })
        .then(data=>{
            if(data.msg==='success'){
                alert("Your details are send to admin for approval")
                window.location.href='/stu-login'
            }
            else{
                window.location.href='/stu-register'
            }
        })

    }
    
    function handleLog(){
        window.location.href='/stu-login'
    }
    return (
        <div >
            <div>
              <Link to='/'>Home</Link>  
            </div>
            <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="username" value={user.username} placeholder="User name"onChange={(e)=>{setuser({...user,username:e.target.value})}} ></input>
            <input type="password" name="password" value={user.password} placeholder="Password" onChange={(e)=>{setuser({...user,password:e.target.value})}}></input>
            <input type="email" name="email" value={user.email} placeholder="Email" onChange={(e)=>{setuser({...user,email:e.target.value})}}></input>
            <div className="button" onClick={handleRegister}>Register</div>
            <div>or</div>
            <div className="button" onClick={handleLog}>Login</div>
            </div>

            
        </div>
    )
}

export default Register