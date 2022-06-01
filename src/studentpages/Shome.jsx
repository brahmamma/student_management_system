import React from 'react'
import Dashboards from '../studentdashboard/Dashboards'
import Navbars from '../studentdashboard/Navbars'
import Sidebars from '../studentdashboard/Sidebars'
function Ahome(){
    return(
        <div>
            <Navbars/>
            <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
            <Sidebars/>
            <Dashboards/>
            </div>
            </div>
        
        
        </div>
        
    )


}
export default Ahome