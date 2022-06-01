import React from 'react'
const Sidebar = () => {
    
   
    const user=JSON.parse(window.localStorage.getItem('loggedinuser'))
        
    function handlelogout(){
        window.localStorage.removeItem('loggedinuser');
        window.location.href='/'
    }
    return (
         <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <center>
                <li><img src={process.env.PUBLIC_URL + "/student1.png"} className="imagestyle"/></li>
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5><b>{user.username.toUpperCase()}</b></h5></a></li>
                <li class="nav-item mb-2 "><span  onClick={handlelogout}>Logout</span></li>
                </center>
                
            </ul>
       </div>
    )
}
 
export default Sidebar