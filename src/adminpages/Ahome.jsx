import React from 'react'
import Dashboard from '../admindashboard/Dashboard'
import Navbar from '../admindashboard/Navbar'
import Sidebar from '../admindashboard/Sidebar'
function Ahome(){
    return(
        <div>
            <Navbar/>
            <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
            <Sidebar/>
            <Dashboard/>
            </div>
            </div>
        
        </div>
        
    )


}
export default Ahome