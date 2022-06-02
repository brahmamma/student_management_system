import React from 'react'
import {Link} from  'react-router-dom'
function Alogin(){
    const [user, setuser] = React.useState({
        username:'',
        password:''
      });
  
    function handlelogin(){
      
        fetch("https://student-manageent-system-123.herokuapp.com/auth_admin",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user) // body data type must match "Content-Type" header
        })
        .then((res)=>{
          return res.json()
        })
        .then(data=>{
          if(data.msg==='success'){
            window.localStorage.setItem('admintoken',data.token)
            window.location.href='/logsuccessadmin'
          }
          else{
              alert("Provide valid credentials")
            window.location.href='/adm-login'
          }
          
        })
      }
    
    return (
        <div>
            <div>
              <Link to='/'>Home</Link>  
            </div>
    
        <div className="login">

            <h1>Login</h1>
            <input type="text" name="username" value={user.username}onChange={(e)=>{setuser({...user,username:e.target.value})}} placeholder="Username"></input>
            <input type="password" name="password" value={user.password}onChange={(e)=>{setuser({...user,password:e.target.value})}} placeholder="Password" ></input>
            <div className="button" onClick={handlelogin}>Login</div>
            
        </div>
        </div>
    )
}

export default Alogin